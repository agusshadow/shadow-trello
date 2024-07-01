import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';
import Boards from '../boards/Boards';
import Board from '../boards/Board';
import Tasks from '../tasks/Tasks';
import Task from '../tasks/Task';
import UserProfile from '../profile/UserProfile';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/iniciar-sesion" replace />,
  },
  {
    path: '/iniciar-sesion',
    element: <Login />,
  },
  {
    path: '/crear-cuenta',
    element: <Register />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'inicio',
        element: <ProtectedRoute element={Home} />,
      },
      {
        path: 'tableros',
        element: <ProtectedRoute element={Boards} />,
      },
      {
        path: 'tableros/:id',
        element: <ProtectedRoute element={Board} />,
      },
      {
        path: 'tareas',
        element: <ProtectedRoute element={Tasks} />,
        children: [
          {
            path: ':id',
            element: <ProtectedRoute element={Task} />,
          },
        ],
      },
      {
        path: 'perfil',
        element: <ProtectedRoute element={UserProfile} />,
      },
    ],
  },
]);
