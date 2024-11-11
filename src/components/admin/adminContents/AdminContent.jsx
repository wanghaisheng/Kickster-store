import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AdminContentProducts from './AdminContentProducts';
import AdminContentUsers from './AdminContentUsers';
import AdminContentOrders from './AdminContentOrders';

const AdminContent = () => {
    const { section } = useParams();
    if (section === "products"){
    const { loading, data, error } = useSelector(state => state.products);
    }
    else if (section === "users"){
      const { loading, data, error } = useSelector(state => state.users);
    }
    else{
    const { loading, data, error } = useSelector(state => state.orders);
    }

  return (
    <section className='admin-content-section w-full'>
      {
        section === "products" ? <AdminContentProducts /> :
        section === "users" ? <AdminContentUsers /> :
        section === "orders" && <AdminContentOrders />
      }
    </section>
  )
}

export default AdminContent