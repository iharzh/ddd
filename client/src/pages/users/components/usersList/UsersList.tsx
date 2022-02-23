import UserRow from './components/User';

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
    <>
      {users.map(user => (
        <UserRow key={user.email} firstName={user.firstName} lastName={user.lastName} email={user.email} username={user.username} />
      ))}
    </>
  )
}

export default UsersList;
