import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import ProductCard from './ProductCard';
import { IoIosArrowDown } from "react-icons/io";


const List = () => {
  const filteredProducts = useSelector((state) => state.filters.filteredProducts);
  const [ filtered, setFiltered ] = useState(null);
  const [ sorting, setSorting ] = useState(null);
  const screen = window.innerWidth;  
  const [reveal, setReveal] = useState({
    filter: false,
    sort: false
  })
  const sortOptions = [
    {
      label: "Price : Low - High",
      value: "low-high"
    },
    {
      label: "Price : High - Low",
      value: "high-low"
    }
  ]

  return (
    !filteredProducts ?
      <Loader />
      :
      <section className='product-list lg:w-[80%]'>
        <div className={`sorting h-[7vh] lg:h-[10vh] mb-2 lg:mb-0 flex items-center ${screen < 640 ? "justify-between" : "justify-end"}`}>
          <div className="sort-btn max-w-[180px] w-[45%] relative flex justify-end">
            <span onClick={() => setReveal(prev => ({...prev, sort: !prev.sort}))} className='flex w-fit gap-2 items-center p-2 txt-medium'>Sort By <IoIosArrowDown /></span>
            <ul className={`absolute ${reveal.sort ? "block" : "hidden"} top-[6vh] left-0 bg-[#e6e6e6d3] backdrop-blur-sm rounded w-full z-10 border-zinc-200 border-2`}>
              {
                sortOptions.map((option, index) => (
                  <li className={`p-2 txt-medium text-[0.9rem] hover:bg-[#f9f9f9] transition-all duration-300 ${index === 0 && "border-b"} border-zinc-300`} key={option.label}>
                    {option.label}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="list-container grid grid-cols-1 lg:grid-cols-3 gap-x-[1.25rem] gap-y-[4rem]">
          {
            filteredProducts.map((product) => (
              <ProductCard product={product} />
            ))
          }
        </div>
      </section>
  )
}

export default List