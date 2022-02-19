class UsersRepository {
  private readonly models: any;

  constructor(models: any) {
    this.models = models
  }

  async getAllUsers(): Promise<any> {
    try {
      const {UserModel} = this.models;

      const result =  await UserModel.findAll();

      console.log({result});
      return result;
    } catch(e) {
      console.log('Error in usersRep');
    }
  }
}

export default UsersRepository;
