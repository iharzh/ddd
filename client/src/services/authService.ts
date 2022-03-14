import { Auth, BaseApiUrl, CurrentUser } from '../shared/constants/apiRoutes';
import { HttpService } from './httpService';
import { CurrentUserData } from '../types/user';

class AuthService {
  private readonly httpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async login(user: any) {
    try {
      const result = await this.httpService.post(`${BaseApiUrl}/${Auth.Login}`, user);
      const { token, refreshToken, userData } = result.data;

      localStorage.setItem('JWT_TOKEN', token);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);

      return userData;
    } catch (e) {
      console.error(e);
    }
  }

  async getCurrentUser(): Promise<CurrentUserData> {
    try {
      const currentUserResponse = await this.httpService.get<CurrentUserData>(
        `${BaseApiUrl}/${CurrentUser.GetCurrentUser}`
      );

      return currentUserResponse;
    } catch (e) {
      console.error({ e });
      throw new Error('Get Current User error');
    }
  }

  // async logout(user: any) {
  //   try {
  //     const result = await this.httpService.post(`${BaseApiUrl}/${Auth.Logout}`)
  //
  //     localStorage.removeItem('JWT_TOKEN');
  //     localStorage.removeItem('REFRESH_TOKEN')
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
}

export default AuthService;
