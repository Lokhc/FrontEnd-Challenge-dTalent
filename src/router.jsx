import { createBrowserRouter, redirect } from 'react-router-dom';

import Employees from './pages/Employees.jsx';
import Receipts from './pages/Receipts.jsx';
import Communicated from './pages/Communicated.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx'

import { requireAuth } from './utils/authLoader.js';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: requireAuth,
        children: [
          {
            index: true,
            loader: () => redirect('employees'),
          },
          {
            path: 'employees',
            element: <Employees />,
          },
          {
            path: 'receipts',
            element: <Receipts />
          },
          {
            path: 'communicated',
            element: <Communicated />
          },
          {
            path: 'settings',
            element: <Settings />
          }
        ]
      },
    ]
  }
]);

export default router;