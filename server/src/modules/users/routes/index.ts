import { Router } from 'express';
import UsersController from '../controller';
import UsersRepository from '../repository';
import { UserModel } from '../../../infrastructure/db/models';

const usersRouter = Router();
const userRepo = new UsersRepository({ UserModel });
const usersController = new UsersController(userRepo);

usersRouter.get('/', async (req, res) => {
  const users = await usersController.getAllUsers();

  return res.status(200).json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await usersController.getUserById(id);

  return res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
  try {
    const createdUser = await usersController.createUser(req.body);

    return res.status(201).json(createdUser);
  } catch (e: any) {
    throw new Error(e);
  }
});

export default usersRouter;
