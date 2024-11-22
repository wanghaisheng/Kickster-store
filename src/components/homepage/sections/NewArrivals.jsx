import React, { useEffect, useState } from "react";
import ProductCards from "../../universal/ProductCards";
import { useSelector } from "react-redux";

const NewArrivals = () => {
  const { data } = useSelector((state) => state.products);
  const [newProducts, seNewProducts] = useState(null);
  useEffect( ()=> {
    if(data) {
      const sortedProducts = data.filter(product => product.new);
      seNewProducts(sortedProducts);
    }
  }, [data])
  return (
    <section className='new-arrivals-section w-full mt-[5vh] py-10 px-5 relative z-10 bg-[#fff]'>
      {
        newProducts &&
        <ProductCards heading={"New Arrivals"} cards={newProducts} />
      }
    </section>
  )
}


export default NewArrivals