import { Router } from 'express';
import AuthController from '../controller';
import UsersRepository from '../../users/repository';
import User from '../../../infrastructure/db/models/user';
import { TokenExpiredError } from 'jsonwebtoken';

const authRouter = Router();
const usersRepository = new UsersRepository({ UserModel: User });
const authController = new AuthController(usersRepository);

authRouter.post('/login', async (req, res) => {
  const response = await authController.login(req.body);
  res.send(response);
});

authRouter.post('/register', () => {
  console.log('register router triggered');
});

authRouter.post('/refreshToken', async (req, res) => {
  try {
    const refreshTokenResult = authController.refreshToken(req.body.refreshToken);
    return res.send(refreshTokenResult);
  } catch (err) {
    console.log({ err, isExpired: err instanceof TokenExpiredError });
    if (err instanceof TokenExpiredError) {
      return res.status(401).send({ message: 'Refresh token expired, please login again' });
    }

    res.status(500).send({ message: 'Unknown server error' });
  }
});

export default authRouter;
