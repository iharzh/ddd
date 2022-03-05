import {Router} from 'express';
import usersRouter from '../../modules/users/routes';
import authRouter from '../../modules/auth/routes';
import { validateToken } from '../../modules/auth/middleware/validateToken';

const router = Router();

router.use('/auth', authRouter)
router.use('/users', validateToken, usersRouter)

export default router;
