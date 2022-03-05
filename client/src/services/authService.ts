class AuthService {
  async login(user: any) {
    try {
      const response: any = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const result = await response.json()

      console.log({result})

      if (result.token) {
        console.log(result.token)
        localStorage.setItem('JWT_TOKEN', result.token)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export default AuthService;
