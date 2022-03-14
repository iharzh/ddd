import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AuthService from '../services/authService';
import httpService from '../services/httpService';
import { Spinner } from 'react-bootstrap';

interface CurrentUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: CurrentUser | null;
  userError: any;
  isInitialLoading: boolean;
  isLoading: boolean;
  login: (user:any) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [userError, setUserError] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentUser = useCallback(async () => {
    try {
      const authService = new AuthService(httpService);

      const result = await authService.getCurrentUser();
      // @ts-ignore
      setUser(result.data);
    } catch(e) {
      setUser(null)
    } finally {
      setIsInitialLoading(false)
    }
  }, [])

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  const login = useCallback(async (userData) => {
    try {
      setIsLoading(true);

      const authService = new AuthService(httpService);

      const user = await authService.login(userData)
      setUser(user);
    } catch (e) {
      console.log({e})
      setUserError(e as any);
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    setUser(null)
  }, [])

  const memoizedValue = useMemo(() => ({
    user,
    userError, isInitialLoading, isLoading,
    login,
    logout
  }), [isInitialLoading, isLoading, login, logout, user, userError])

  if (isInitialLoading) {
    return <Spinner animation="border"/>
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export default useAuth;



