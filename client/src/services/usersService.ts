import { CreateUserDTO } from "../types/user";


class UsersService {
  async getAllUsers() {
    try {
      const result = await fetch('http://localhost:5000/users');
      return await result.json();
    } catch(e) {
      console.error(e)
    }
  }

  async createUser(user: CreateUserDTO) {
    try {
      const result = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })

      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }
}

export default UsersService;
