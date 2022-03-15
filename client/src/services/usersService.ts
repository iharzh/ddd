import { CreateUserDTO } from '../types/user';
import { BaseApiUrl, Users } from '../shared/constants/apiRoutes';
import { HttpService } from './httpService';

class UsersService {
  private readonly httpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getAllUsers(): Promise<any> {
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

  async getUserById(id: string) {
    try {
      return await this.httpService.get(`${BaseApiUrl}/${Users.GetUserById}`.replace(':id', id));
    } catch (e) {
      console.error({ e });
    }
  }
}

export default UsersService;
