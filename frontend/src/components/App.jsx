import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import AuthContext from '../contexts';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      // {
      //   path: '/signup',
      //   element: <SignUpPage />,
      // },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <div className='h-100' id='chat'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
