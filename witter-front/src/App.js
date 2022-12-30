import React from 'react'
import './App.css';
import { createBrowserRouter as Router, RouterProvider, Outlet } from 'react-router-dom';

import { WeetFeed } from './weets'
import { CreateUser, LoginUser, LogoutUser } from './users'
import { NavBar } from './nav'
import { SocialBar } from './socials'

const HeaderLayout = () => (
  <>
    <NavBar />
    <Outlet />
    <SocialBar />
  </>
);

const router = Router([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <WeetFeed />,
      },
      {
        path: "register",
        element: <CreateUser />,
      },
      {
        path: "login",
        element: <LoginUser />,
      },
      {
        path: "logout",
        element: <LogoutUser />
      },
    ],
  }
]);

export function App() {
  return (
  <div className='flex justify-center bg-black'>
    <RouterProvider router={router}/>
  </div>
  )
}
