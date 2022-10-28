import { register, login, setAvatar, getAllUsers } from '../controllers/userController';
import { ServerRoute } from '@hapi/hapi';

const usersRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: register,
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: login,
  },
  {
    method: 'POST',
    path: '/api/auth/setAvatar/{id}',
    handler: setAvatar,
  },
  {
    method: 'GET',
    path: '/api/auth/allUsers/{id}',
    handler: getAllUsers,
  },
];

export default usersRoutes;
