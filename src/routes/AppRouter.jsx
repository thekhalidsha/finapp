import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import PublicLayout from './PublicLayout'
import PrivateLayout from './PrivateLayout'
import Dashboard from '../pages/private/Dashboard'
import AddFinance from '../pages/private/AddFinance'
import RemoveFinance from '../pages/private/RemoveFinance'
import Logout from '../pages/Logout'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route path="" element={<Navigate to="/login" />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<Logout/>} />

        </Route>
        <Route path='/dashboard' element={<PrivateLayout />}>
          <Route index path='' element={<Dashboard />} />
          <Route path='addFinance' element={<AddFinance />} />
          <Route path='addFinance/:id' element={<AddFinance />} />
          <Route path='delFinance/:id' element={<RemoveFinance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter