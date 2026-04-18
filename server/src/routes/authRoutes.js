import express from 'express';
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  meController,
} from '../controller/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController);
router.post('/logout', protect, logoutController);
router.get('/me', protect, meController);

export default router;

