import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, Users, Login, Register } from './pages';

const PrivateOutlet = () => {
  const isAuthenticated = !!localStorage.getItem('JWT_TOKEN')

  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateOutlet/>}>
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
