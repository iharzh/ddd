import { CreateUserDTO } from '../types/user';


class UsersService {
  private readonly httpService;

  constructor(httpService: any) {
    this.httpService = httpService
  }

  async getAllUsers() {
    try {
      // const token = localStorage.getItem('JWT_TOKEN');
      // const result = await fetch('http://localhost:5000/users', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   },
      // });
      //
      // return await result.json()
      return await this.httpService.get('http://localhost:5000/users')
    } catch(e) {
      console.error({ e })
    }
  }

  async createUser(user: CreateUserDTO) {
    try {
      // const token = localStorage.getItem('JWT_TOKEN');
      // const response = await fetch('http://localhost:5000/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(user)
      //   })
      return await this.httpService.post('http://localhost:5000/users', user)
    } catch (e) {
      console.error({ e })
    }
  }
}

export default UsersService;
