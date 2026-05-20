import express from 'express';
import protect from '../middleware/auth.js';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  addTicketMessage,
  getTicketHistory
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.get('/:id', protect, getTicketById);
router.patch('/:id/status', protect, updateTicketStatus);
router.post('/:id/message', protect, addTicketMessage);
router.get('/:id/history', protect, getTicketHistory);

export default router;
