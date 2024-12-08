import React from 'react'
import Filters from './sections/Filters'
import List from './sections/List'
import { useParams } from 'react-router-dom'

const ProductList = () => {

    const { filter } = useParams();
    
    return (
        <section className='product-list-page min-h-[88lvh] flex gap-[3vw] px-5 relative'>
            <Filters />
            <List filter={filter} />
        </section>
    )
}

export default ProductList