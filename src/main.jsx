import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Settings from './pages/Settings.jsx';

import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from 'react-router-dom';

import Employees from './pages/Employees.jsx';
import Receipts from './pages/Receipts.jsx';
import Communicated from './pages/Communicated.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';

const requireAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'home',
        element: <Home />,
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
