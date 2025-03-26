import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PublicLayout = () => {
  // const authStatus = localStorage.getItem('isAuthenticated');
  // if (authStatus === 'true') {
  //   return <Navigate to="/dashboard"/>
  // }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout