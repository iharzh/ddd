import UsersList, {User} from './UsersList';
import { useCallback, useEffect, useState } from 'react';
import UsersService from '../../../../services/usersService';
import httpService from '../../../../services/httpService';

const UsersListContainer = () => {
  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[] | null>(null)

  const loadUsers = useCallback(async () => {
    try {
      const usersService = new UsersService(httpService);
      const result: User[] = await usersService.getAllUsers();
      setUsers(result);
      setIsUsersLoading(false);
    } catch(e) {
      console.log('error', e)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  if (isUsersLoading || !users) return <p>Loading...</p>

  return <UsersList users={users} />
}

export default UsersListContainer;
