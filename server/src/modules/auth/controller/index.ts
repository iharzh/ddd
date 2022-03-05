import UsersRepository from '../../users/repository';
import { compare, hash } from 'bcrypt';
import {sign} from 'jsonwebtoken';

class AuthController {
  private readonly usersRepo: UsersRepository

  constructor(usersRepo: UsersRepository) {
    this.usersRepo = usersRepo;
  }

  async login(user: any): Promise<any> {
    try {

    const foundUser = await this.usersRepo.getUserByEmail(user.email)
    if (!foundUser) throw new Error('Not found');

    const isPasswordValid = await compare(user.password, foundUser.password);

    if (!isPasswordValid) throw new Error('Password invalid');


    const userDataToReturn = {
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      username: foundUser.username,
      email: foundUser.email
    }

    const token = sign(userDataToReturn, process.env.JWT_SECRET || '', {
      expiresIn: 900 // 15 min
    })

      return { token }
    } catch(e){console.log(e)}
  }
}

export default AuthController;
