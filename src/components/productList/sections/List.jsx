import React, { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { db } from '../../../utils/firebaseConfigures';
// import { getDocs } from 'firebase/firestore';

const List = () => {
  // const filterData = useSelector(state => state.filters.filterData);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [products, setProducts] = useState([]);

  // useMemo(() => {
  //   if (products.length > 0) {
  //     const filtered = products.filter((product) => {
  //       return Object.keys(filterData).every((section) => {
  //         if (filters[section].length === 0) return true; // No filter applied for this section
  //         return filters[section].some((filter) => product[section]?.includes(filter));
  //       });
  //     });
  //     const filtered = products.filter(item => filterData.gender.includes(item.gender));
  //     setFilteredProducts(prev => [...prev, filtered]);
  //   }
  // }, [filterData, products]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getDocs(db, "products");
  //     const productsData = data.docs.map(doc => doc.data());
  //     setProducts(productsData);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <section className='product-list w-[80%] bg-red-300'>
      <h1>List</h1>
      {filteredProducts.map((product, index) => (
        <div key={index}>{product.name}</div>
      ))}
    </section>
  )
}

export default List