import React from 'react';
import AdminNav from './AdminNav';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPanel = () => {
  const user = useSelector(state => state.loggedInUser.user);

  return (

    user ? user.role === "admin" ?
    <div className='dashboard-section w-full relative'>
        <AdminNav />
        <Outlet />
    </div> :
    <Navigate to="/login"/> : <Navigate to="/login"/>
  )
}

export default AdminPanel