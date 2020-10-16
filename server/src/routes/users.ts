import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/User/register';

const router = Router();

// Get user Data
router.get('/api/users/current', (req: Request, res: Response) => {
  res.send('Hello world');
});

// Register new account
router.post('/api/users/register', registerUser);

// Login to existing account
router.post('/api/users/login', () => {});

// Update existing account
router.put('/api/users/update', () => {});

export { router as UserRouter };
