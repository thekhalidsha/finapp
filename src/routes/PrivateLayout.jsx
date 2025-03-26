import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PrivateLayout = () => {
    if(localStorage.getItem('isAuthenticated') == 'true'){
        return (
            <div>
                <Navbar card='private' />
                <Outlet/>
            </div>
          )
    }else{
        return <Navigate to='/login'/>
    }
  
}

export default PrivateLayout