import { Router } from 'express';
import { registerUser } from '../controllers/User/register';
import { signIn } from '../controllers/User/singin';
import { validateUser } from '../helpers/validateUser';
import { validRequest } from '../middlewares/validate-request';
import { signOut } from '../controllers/User/signout';
import { currentUser } from '../controllers/User/current-user';

const router = Router();

// Get user Data
router.get('/api/users/current', currentUser);

// Register new account
router.post('/api/users/register', validateUser(), validRequest, registerUser);

// Login to existing account
router.post('/api/users/login', signIn);

router.get('/api/users/signout', signOut);

// Update existing account
router.put('/api/users/update', () => {});

export { router as UserRouter };
