import Login from './Login';
import { useCallback } from 'react';
import AuthService from '../../services/authService';


const LoginContainer = () => {
  const handleLogin = useCallback(async(user) => {
    const authService = new AuthService();

    return await authService.login(user)
  }, [])


  return <Login handleLogin={handleLogin}/>
}

export default LoginContainer;
