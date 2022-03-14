import { User } from '../UsersList';

const UserRow = ({ email, firstName, lastName, username }: User) => (
  <div style={{ border: '1px solid' }}>
    <p>
      {firstName} {lastName}
    </p>
    {username && <p>{username}</p>}
    <p>{email}</p>
  </div>
);

export default UserRow;
