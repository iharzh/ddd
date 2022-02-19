import { Router } from 'express';
import UsersController from '../controller';
import UsersRepository from '../repository';
import { UserModel } from '../../../infrastructure/db/models';

const usersRouter = Router();
const userRepo = new UsersRepository({UserModel})
const usersController = new UsersController(userRepo);

usersRouter.get('/', async (req, res) => {
  const users = await usersController.getAllUsers();

  return res.status(200).json(users)
})

export default usersRouter;
