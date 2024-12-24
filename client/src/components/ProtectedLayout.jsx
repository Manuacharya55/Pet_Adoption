import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from './NavBar';

const ProtectedLayout = () => {
  return (
    <>
    <NavBar/>
    <Outlet />
    {/* <Footer/> */}
    </>
  )
}

export default ProtectedLayout