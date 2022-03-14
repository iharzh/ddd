import Header from './Header';
import useAuth from '../../../contexts/auth';
const HeaderContainer = () => {
  const authContext: any = useAuth();

  const handleLogout = () => {
    authContext.logout();
  }

  return (
    <Header currentUser={authContext.user} handleLogout={handleLogout}/>
  );
};

export default HeaderContainer;
