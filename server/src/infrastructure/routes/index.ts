import {Router} from 'express';
import usersRouter from '../../modules/users/routes';
import authRouter from '../../modules/auth/routes';
import { validateToken } from '../../modules/auth/middleware/validateToken';

const router = Router();


router.use('/', authRouter);
router.use('/users', validateToken, usersRouter);
router.use('/currentUser', validateToken, (req, res) => {

  // @ts-ignore
  res.status(200).send(req.user);
});

export default router;
