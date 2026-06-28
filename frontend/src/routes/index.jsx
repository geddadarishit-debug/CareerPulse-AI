import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from '../context/AppContext';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Upload from '../pages/Upload';
import Analysis from '../pages/Analysis';
import History from '../pages/History';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  
  if (!state.accessToken && !localStorage.getItem('accessToken')) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { state } = useApp();
  
  if (state.accessToken || localStorage.getItem('accessToken')) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'upload',
        element: <Upload />,
      },
      {
        path: 'analysis',
        element: <Analysis />,
      },
      {
        path: 'analysis/:id',
        element: <Analysis />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRoutes = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} fallbackElement={<Loader fullScreen />} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </AppProvider>
  );
};

export default AppRoutes;
