import User from '../../../infrastructure/db/models/user';

class UsersRepository {
  private readonly models: any;

  constructor(models: any) {
    this.models = models;
  }

  async getAllUsers(): Promise<any> {
    try {
      const { UserModel } = this.models;

      const result = await UserModel.findAll();

      console.log({ result });
      return result;
    } catch (e) {
      console.log('Error in usersRep');
    }
  }

  async createUser(user: any): Promise<any> {
    try {
      const { UserModel } = this.models;

      const result = await UserModel.create({ ...user });

      return result;
    } catch (e) {
      console.log('Error in usersRep while creating user:', e);
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const { UserModel } = this.models;
      const foundUser = await UserModel.findOne({ where: { email } });

      return foundUser;
    } catch (e) {
      console.log(e);
    }
  }
}

export default UsersRepository;
