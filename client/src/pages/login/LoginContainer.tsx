import Login from './Login';
import { useCallback } from 'react';
import AuthService from '../../services/authService';
import httpService from '../../services/httpService';


const LoginContainer = () => {
  const handleLogin = useCallback(async(user) => {
    const authService = new AuthService(httpService);

    return await authService.login(user)
  }, [])


  return <Login handleLogin={handleLogin}/>
}

export default LoginContainer;
