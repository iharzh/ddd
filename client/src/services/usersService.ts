import { CreateUserDTO } from '../types/user';
import { BaseApiUrl, Users } from '../shared/constants/apiRoutes';

class UsersService {
  private readonly httpService;

  constructor(httpService: any) {
    this.httpService = httpService;
  }

  async getAllUsers() {
    try {
      return await this.httpService.get(`${BaseApiUrl}/${Users.GetAllUsers}`);
    } catch (e) {
      console.error({ e });
    }
  }

  async createUser(user: CreateUserDTO) {
    try {
      return await this.httpService.post(`${BaseApiUrl}/${Users.CreateUser}`, user);
    } catch (e) {
      console.error({ e });
    }
  }
}

export default UsersService;
