class UsersController {
  private readonly userRepo: any;

  constructor(userRepo: any) {
    this.userRepo = userRepo;
  }

  async getAllUsers(): Promise<any> {
    try {
      return await this.userRepo.getAllUsers()
    } catch (e) {
      console.log('Users Controller error')
    }
  }
}

export default UsersController;
