import UsersRepository from '../../users/repository';
import { compare } from 'bcrypt';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';

class AuthController {
  private readonly usersRepo: UsersRepository;

  constructor(usersRepo: UsersRepository) {
    this.usersRepo = usersRepo;
  }

  async login(user: any): Promise<any> {
    try {
      const foundUser = await this.usersRepo.getUserByEmail(user.email);
      if (!foundUser) throw new Error('Not found');

      const isPasswordValid = await compare(user.password, foundUser.password);

      if (!isPasswordValid) throw new Error('Password invalid');

      const userDataToReturn = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser.id,
      };

      const token = sign(userDataToReturn, process.env.JWT_SECRET || '', {
        expiresIn: 30,
      });
      const refreshToken = sign(userDataToReturn, process.env.JWT_REFRESH_SECRET || '', {
        expiresIn: 3600, // 1 hr
      });

      return { token, refreshToken, userData: foundUser };
    } catch (e) {
      console.log(e);
    }
  }

  refreshToken(refreshToken: string): { token: string } {
    console.log({ refreshToken });

    // @ts-ignore
    return verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded: any) => {
      if (err && err instanceof TokenExpiredError) {
        // @ts-ignore
        throw new TokenExpiredError(err);
      }

      const userData = {
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        username: decoded.username,
        email: decoded.email,
        id: decoded.id,
      };
      // @ts-ignore
      const token = sign(userData, process.env.JWT_SECRET, { expiresIn: 30 });

      console.log('newly-generated', { token });

      return { token };
    });
  }
}

export default AuthController;
