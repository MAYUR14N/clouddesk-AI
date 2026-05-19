import prisma from '../../lib/prismaClient.js';

/**
 * GET /api/admin/metrics
 */
export async function getMetrics(req, res, next) {
  try {
    const total = await prisma.ticket.count();
    const open = await prisma.ticket.count({ where: { status: 'OPEN' } });
    const resolved = await prisma.ticket.count({ where: { status: 'RESOLVED' } });
    const urgent = await prisma.ticket.count({ where: { priority: 'URGENT' } });
    res.json({ total, open, resolved, urgent });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/admin/tickets/:id/resolve
 */
export async function resolveTicket(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: 'RESOLVED' },
    });
    // log history (admin assumed to be in req.user)
    await prisma.ticketHistory.create({
      data: {
        ticketId,
        actorId: req.user.id,
        action: 'Ticket resolved by admin',
      },
    });
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/admin/tickets/:id/escalate
 */
export async function escalateTicket(req, res, next) {
  try {
    const ticketId = Number(req.params.id);
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { priority: 'URGENT' },
    });
    await prisma.ticketHistory.create({
      data: {
        ticketId,
        actorId: req.user.id,
        action: 'Ticket escalated to URGENT by admin',
      },
    });
    res.json(ticket);
  } catch (err) {
    next(err);
  }
}
