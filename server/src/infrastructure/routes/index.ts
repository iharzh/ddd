import {Router} from 'express';
import usersRouter from '../../modules/users/routes';
import authRouter from '../../modules/auth/routes';

const router = Router();

router.use('/auth', authRouter)
router.use('/users', usersRouter)

export default router;
