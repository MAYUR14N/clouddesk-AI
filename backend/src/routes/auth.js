import express from 'express';
import { register, me } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prismaClient.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT
    const token = jwt.sign({
      userId: user.id,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Success response
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
router.get('/me', protect, me);

export default router;
