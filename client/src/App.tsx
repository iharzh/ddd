import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, Users, Login, Register } from './pages';

const PrivateOutlet = ({ isAuthenticated }: any) => {
  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  return (<>
      <button onClick={isAuth ? logout : login}>Auth</button>
    <Routes>
      <Route path="/" element={<PrivateOutlet isAuthenticated={isAuth}/>}>
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </>
  );
}

export default App;
