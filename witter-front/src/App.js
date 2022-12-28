import React from 'react'
import './App.css';
import { createBrowserRouter as Router, RouterProvider } from 'react-router-dom';

import { WeetList, WeetFeed } from './weets'
import { CreateUser, LoginUser, LogoutUser } from './users'
import { NavBar } from './nav'
import { SocialBar } from './socials'

const router = Router([
  {
    path: "/",
    element: <WeetList />,
  },
  {
    path: "weet",
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
]);


export function App() {
  return (
  <div className='flex justify-center bg-black'>
    <NavBar/><RouterProvider router={router}/><SocialBar/>
  </div>
  )
}
