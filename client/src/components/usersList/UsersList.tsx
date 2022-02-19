export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
}

interface UsersListProps {
  users: User[]
}

const UsersList = ({users}: UsersListProps) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.email}>
          <p>{user.firstName} {user.lastName}</p>
          {user.username && <p>{user.username}</p>}
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  )
}

export default UsersList;
