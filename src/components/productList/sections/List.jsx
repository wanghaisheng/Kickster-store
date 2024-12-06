import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';

const List = () => {
  const filteredProducts = useSelector(state => state.filters.filteredProducts)

  return (
    !filteredProducts ?
    <Loader/>
    :
    <section className='product-list w-[80%] bg-red-300'>
      <h1>List</h1>
      {
        filteredProducts.map((product, index) => (
          <div key={index}>{product.name}</div>
        ))
      }
    </section>
  )
}

export default List