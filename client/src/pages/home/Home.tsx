import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (<div>
    <nav>
      <Link to="/users">Users</Link>
      <Link to="/">Home</Link>
    </nav>
    <Outlet />
  </div>)
}

export default Home
