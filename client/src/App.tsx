import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Users, Login, Register, User } from './pages';
import useAuth, { AuthProvider } from './contexts/auth';
import { Layout } from './shared/components';

const PrivateOutlet = () => {
  const isAuthenticated = !!localStorage.getItem('JWT_TOKEN');

  const authContext = useAuth();

  console.log({ authContext });

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
