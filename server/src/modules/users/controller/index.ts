import UsersRepository from '../repository';

class UsersController {
  private readonly userRepo: UsersRepository;

  constructor(userRepo: UsersRepository) {
    this.userRepo = userRepo;
  }

  async getAllUsers(): Promise<any> {
    try {
      return await this.userRepo.getAllUsers();
    } catch (e) {
      console.log('Users Controller error');
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      return await this.userRepo.getUserById(id);
    } catch (e) {
      console.log('Users Controller error');
    }
  }

  async createUser(user: any) {
    try {
      return this.userRepo.createUser(user);
    } catch (e) {
      console.log('User creation error: ', e);
    }
  }
}

export default UsersController;
