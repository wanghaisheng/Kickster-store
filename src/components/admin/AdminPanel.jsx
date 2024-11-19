import React from 'react';
import AdminNav from './AdminNav';
import { Outlet } from 'react-router-dom';


const AdminPanel = () => {

  
  return (
    <div className='dashboard-section w-full relative'>
        <AdminNav />
        <Outlet />
    </div>
  )
}

export default AdminPanel