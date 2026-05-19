import prisma from '../../lib/prismaClient.js';
import { generateToken } from '../../middleware/authMiddleware.js'; // not used but ensure import exists
import { suggestCategory, suggestPriority } from '../../services/aiService.js';

// Helper to create a history entry
async function createHistory(ticketId, userId, action) {
  await prisma.ticketHistory.create({
    data: {
      ticketId,
      actorId: userId,
      action,
    },
  });
}

/**
 * POST /api/tickets
 */
export async function createTicket(req, res, next) {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
    const userId = req.user.id;
    // AI suggestions (fallback handled inside service)
    const category = await suggestCategory(description);
    const suggestedPriority = priority || (await suggestPriority(description));

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        category,
        priority: suggestedPriority,
        status: 'OPEN',
        createdById: userId,
      },
    });

    await createHistory(ticket.id, userId, 'Ticket created');
    res.status(201).json({ ticket, category, priority: ticket.priority, status: ticket.status, createdAt: ticket.createdAt, updatedAt: ticket.updatedAt });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tickets
 */
export async function getTickets(req, res, next) {
  try {
    const userId = req.user.id;
    const tickets = await prisma.ticket.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tickets/:id
 */
export async function getTicketById(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        histories: { orderBy: { createdAt: 'asc' } },
        assignedAdmin: true,
        creator: { select: { id: true, name: true, email: true } },
      },
    });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    // Ensure the requester is owner or admin
    if (ticket.createdById !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/tickets/:id/message
 */
export async function addTicketMessage(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const { message, isAI = false } = req.body;
    if (!message) return res.status(400).json({ error: 'Message content required' });
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    const newMessage = await prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId: req.user.id,
        message,
        isAI,
      },
    });
    await createHistory(ticketId, req.user.id, 'Message added');
    res.status(201).json(newMessage);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/tickets/:id/status
 */
export async function updateTicketStatus(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const { status } = req.body;
    const allowed = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });
    await createHistory(ticketId, req.user.id, `Status updated to ${status}`);
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/tickets/:id/history
 */
export async function getTicketHistory(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const history = await prisma.ticketHistory.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
      include: { actor: { select: { id: true, name: true, email: true } } },
    });
    res.json(history);
  } catch (err) {
    next(err);
  }
}
