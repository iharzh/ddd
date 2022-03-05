import Register from './Register';
import { useCallback } from 'react';
import UsersService from '../../services/usersService';
import { CreateUserDTO } from '../../types/user';

const RegisterContainer = () => {
  const createUser = useCallback(async (userData: any) => {
    const user: CreateUserDTO = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    const usersService = new UsersService();

    return await usersService.createUser(user);
  }, [])

  return (
    <Register createUser={createUser}/>
  )
}

export default RegisterContainer;
