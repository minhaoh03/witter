import React from 'react'
import './App.css';
import { createBrowserRouter as Router, RouterProvider, Outlet } from 'react-router-dom';

import { WeetFeed } from './weets'
import { CreateUser, LoginUser, LogoutUser, JoinUser } from './users'
import { NavBar } from './nav'
import { SocialBar } from './socials'
import { checkAuth } from './auth';
import { Profile } from './users';

const HeaderLayout = () => {
  checkAuth()
  return window.location.href === process.env.REACT_APP_DOMAIN ? (
    window.location.href = process.env.REACT_APP_DOMAIN + 'home/'
  ) : (
    <div className='relative inline-block'>
      <NavBar />
      <Outlet />
      <SocialBar />
    </div>
  )
};

const router = Router([
  {
    path: "/",
    element: <HeaderLayout />,
    children: [
      {
        path: "home",
        element: <WeetFeed />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  }, {
    path: "/welcome",
    element: <JoinUser />
  }, {
    path: "/register",
    element: <CreateUser />,
  }, {
    path: "/login",
    element: <LoginUser />,
  }, {
    path: "/logout",
    element: <LogoutUser />
  }
]);

export function App() {
  return (
    <div className='bg-black'>
      <RouterProvider router={router}/>
    </div>
  )
}
