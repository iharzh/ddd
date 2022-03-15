import User from './User';
import { useParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import UsersService from '../../services/usersService';
import httpService from '../../services/httpService';
import { Spinner } from 'react-bootstrap';

const UserContainer = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    try {
      if (!id) return;

      const usersService = new UsersService(httpService);

      const result: any = await usersService.getUserById(id);

      setUser(result.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUserLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isUserLoading) {
    return <Spinner animation="border" />;
  }

  return <User user={user} />;
};

export default UserContainer;
