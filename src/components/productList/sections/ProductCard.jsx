import React from 'react'
import { NavLink } from 'react-router-dom';
import { priceCorrection, priceStringToInt } from '../../universal/priceCorrection';

const ProductCard = ({ product }) => {

    return (
        product &&
        <NavLink to={`/product/${product.id}`} className=' flex-shrink-0 w-[31.6%] h-[480px] overflow-hidden'>
            <div className="product-img w-full h-[68%] overflow-hidden">
                <img className='w-full h-full object-cover' src={product.images[0]} alt={product.title} />
            </div>
            <div className="product-details w-full mt-1 leading-tight">
                <h2 className="txt-medium text-zinc-800 whitespace-nowrap">{product.title}</h2>
                <p className="text-zinc-500 txt-medium">{`${product.gender === "men" ? "Men's Shoes" : product.gender === "women" ? "Women's Shoes" : "Unisex Shoes"}`}</p>
                <p className="text-zinc-500 txt-medium capitalize text-[0.85rem]">{`${product.sport ? product.sport : "sneaker"}`}</p>
                <p className="product-price mt-3 text-[1.1rem] txt-medium flex gap-[1ch] items-center">{`₹ ${priceCorrection(Math.round(priceStringToInt(product.price) - (priceStringToInt(product.price) * product.discount) / 100))}.00`} <span className='text-zinc-500 text-[0.95rem]'>{`MRP : ₹ ${product.price}.00`}</span> <span className='text-orange-800 text-[0.95rem]'>{`-${product.discount}%`}</span></p>
            </div>
        </NavLink>
    )
}

export default ProductCard