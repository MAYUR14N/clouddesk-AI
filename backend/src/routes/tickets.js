import express from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  addTicketMessage,
  getTicketHistory
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.patch('/:id/status', updateTicketStatus);
router.post('/:id/message', addTicketMessage);
router.get('/:id/history', getTicketHistory);

export default router;
