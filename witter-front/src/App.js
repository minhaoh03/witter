import React from 'react'
import './App.css';
import { createBrowserRouter as Router, RouterProvider} from 'react-router-dom';

import { WeetComponent, CreateWeet } from './weets'
import { CreateUser, LoginUser } from './users'


const router = Router([
  {
    path: "/",
    element: <WeetComponent/>,
  },
  {
    path: "weet",
    element: <CreateWeet/>,
  },
  {
    path: "register",
    element: <CreateUser/>,
  },
  {
    path: "login",
    element: <LoginUser/>,
  },
]);


export function App(props) {
  return <RouterProvider router={router}/>
}
