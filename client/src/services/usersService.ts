class UsersService {
  async getAllUsers() {
    try {
      const result = await fetch('http://localhost:5000/users');
      return await result.json();
    } catch(e) {
      console.error(e)
    }
  }
}

export default UsersService;
