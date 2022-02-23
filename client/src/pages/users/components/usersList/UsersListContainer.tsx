import UsersList, {User} from './UsersList';
import { useCallback, useEffect, useState } from 'react';
import UsersService from '../../../../services/usersService';

const UsersListContainer = () => {
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[] | null>(null)

  const loadUsers = useCallback(async () => {
    try {
      const usersService = new UsersService();
      const result: User[] = await usersService.getAllUsers();
      setUsers(result);
      setIsUsersLoading(false);
    } catch(e) {
      console.log('error')
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  if (isUsersLoading || !users) return <p>Loading...</p>

  return <UsersList users={users} />
}

export default UsersListContainer;
