import React from 'react'
import { useParams } from 'react-router-dom'
import AdminContentProducts from './products/AdminContentProducts';
import AdminContentUsers from './AdminContentUsers';
import AdminContentOrders from './AdminContentOrders';

const AdminContent = () => {
    const { section } = useParams();

  return (
    <section className={`${section === "products" ? "admin-products-section" : section === "users" ? "admin-users-section" : "admin-orders-section"} relative w-full px-5`}>
      {
        section === "products" ? <AdminContentProducts /> :
        section === "users" ? <AdminContentUsers /> :
        section === "orders" && <AdminContentOrders />
      }
    </section>
  )
}

export default AdminContent