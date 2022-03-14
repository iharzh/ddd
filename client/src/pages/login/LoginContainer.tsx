import Login from './Login';
import { useCallback } from 'react';
import useAuth from '../../contexts/auth';
import {Navigate} from 'react-router-dom';

const LoginContainer = () => {
  const { login, user } = useAuth();

  const handleLogin = useCallback((user) => {
    login(user)
  }, [login])

  if (user) {
    return <Navigate to="/users" />
  }

  return <Login handleLogin={handleLogin}/>
}

export default LoginContainer;
