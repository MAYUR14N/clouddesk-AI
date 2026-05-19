import express from 'express';
import {
  getMetrics,
  resolveTicket,
  escalateTicket
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/metrics', getMetrics);
router.patch('/tickets/:id/resolve', resolveTicket);
router.patch('/tickets/:id/escalate', escalateTicket);

export default router;
