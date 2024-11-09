import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const AdminContent = () => {
    const { section } = useParams();
    if (section === "products"){
    const { loading, products, error } = useSelector(state => state.products);
    }
    else if (section === "users"){
      const { loading, users, error } = useSelector(state => state.users);
    }
    else{
    const { loading, orders, error } = useSelector(state => state.orders);
    }

  return (
    <section className='admin-content-section w-full'>
      
    </section>
  )
}

export default AdminContent