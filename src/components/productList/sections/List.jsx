import React from 'react';
import Loader from '../../loader/Loader';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';


const List = ({ filteredProducts }) => {

  const { loading } = useSelector(state => state.products)

  return (
    loading ?
      <Loader />
      :
      filteredProducts &&
      <section className='product-list lg:w-[80%]'>
        <div className="list-container grid grid-cols-1 lg:grid-cols-3 gap-x-[1.25rem] gap-y-[4rem]">
          {
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
      </section>
  )
}

export default List