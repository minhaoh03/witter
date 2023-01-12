import React, {useState, useEffect} from 'react'
import './App.css';
import { createBrowserRouter as Router, RouterProvider, Outlet } from 'react-router-dom';

import { WeetFeed, WeetPage } from './weets'
import { CreateUser, LoginUser, LogoutUser, JoinUser } from './users'
import { NavBar } from './nav'
import { SocialBar } from './socials'
import { Profile, UserPage } from './users';
import { getUser } from './auth';

const HeaderLayout = () => {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      let response = await getUser()
      setUser(response)
      setIsLoading(false)
    }
    fetchData()
  }, [isLoading])

  if(isLoading) {
    return window.location.href === process.env.REACT_APP_DOMAIN ? (
      window.location.href = process.env.REACT_APP_DOMAIN + 'home/'
    ) : (
      <div className='relative inline-block w-full'>
        
      </div>
    )
  }
  else {
    return window.location.href === process.env.REACT_APP_DOMAIN ? (
      window.location.href = process.env.REACT_APP_DOMAIN + 'home/'
    ) : (
      <div className='relative inline-block w-full'>
        <NavBar user={user} />
        <Outlet context={[user,setUser]} />
        <SocialBar />
      </div>
    )
  }


  
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
      },
      {
        path: "/:username",
        element: <UserPage />,
      },
      {
        path: "/:username/:weetID",
        element: <WeetPage />,
      },
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
      <RouterProvider router={router} />
    </div>
  )
}
