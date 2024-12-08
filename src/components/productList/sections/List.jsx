import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import ProductCard from './ProductCard';

const List = () => {
  const filteredProducts = useSelector((state) => state.filters.filteredProducts);

  return (
    !filteredProducts ?
      <Loader />
      :
      <section className='product-list w-[80%] flex gap-5 flex-wrap'>
        {
          filteredProducts.map((product) => (
            <ProductCard product={product} />
          ))
        }
      </section>
  )
}

export default List