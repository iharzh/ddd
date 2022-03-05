import UsersRepository from '../../users/repository';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

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
      expiresIn: 30
    })
    const refreshToken = sign(userDataToReturn, process.env.JWT_REFRESH_SECRET || '', {
      expiresIn: 3600 // 1 hr
    })

      return { token, refreshToken }
    } catch(e){console.log(e)}
  }

  refreshToken(refreshToken: string): {token: string} {
    console.log({refreshToken})

    // @ts-ignore
    return verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded: any) => {
      if (err) throw new Error();

      console.log({decoded})
      const userData = {firstName: decoded.firstName, lastName: decoded.lastName, username: decoded.username, email: decoded.email}
      // @ts-ignore
      const token = sign(userData, process.env.JWT_SECRET, {expiresIn: 30});

      console.log('newly-generated', {token})

      return {token}
    })
  }
}

export default AuthController;
