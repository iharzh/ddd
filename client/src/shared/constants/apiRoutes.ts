const BaseApiUrl = process.env.BASE_API_URL || 'http://localhost:5000';

const Auth = {
  Login: 'login',
  Logout: 'logout',
  RefreshToken: 'refreshToken',
};

const CurrentUser = {
  GetCurrentUser: 'currentUser',
};

const Users = {
  GetAllUsers: 'users',
  CreateUser: 'users',
  GetUserById: 'users/:id',
};

export { BaseApiUrl, Auth, CurrentUser, Users };
