class AuthService {
  private readonly httpService;

  constructor(httpService: any) {
    this.httpService = httpService;
  }

  async login(user: any) {
    try {
      const result = await this.httpService.post('http://localhost:5000/auth/login', user)
      const {token, refreshToken} = result.data;

      localStorage.setItem('JWT_TOKEN', token);
      localStorage.setItem('REFRESH_TOKEN', refreshToken)
    } catch (e) {
      console.error(e)
    }
  }
}

export default AuthService;
