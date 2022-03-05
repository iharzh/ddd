import {Router} from 'express';
import AuthController from '../controller';
import UsersRepository from '../../users/repository';
import User from '../../../infrastructure/db/models/user';

const authRouter = Router();
const usersRepository = new UsersRepository({UserModel: User})
const authController = new AuthController(usersRepository);

authRouter.post('/login', async (req, res) => {
  const response = await authController.login(req.body);
  res.send(response)
})

authRouter.post('/register', () => {
  console.log('register router triggered')
})

authRouter.post('/refreshToken', async (req, res) => {
  const newToken = authController.refreshToken(req.body.refreshToken)

  res.send(newToken)
})

export default authRouter;
