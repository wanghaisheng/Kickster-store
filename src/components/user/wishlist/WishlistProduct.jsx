import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { discountCalculator, priceCorrection } from '../../universal/priceCorrection'
import { useDispatch, useSelector } from 'react-redux';
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { wishlistHandler } from '../cart/CartAndWishlist';

const WishlistProduct = ({ product, processing }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);
    return (
        <div className='w-full md:w-[48.5%] lg:w-[31.5%] xl:w-[23.5%] overflow-hidden rounded'>
            <div className="product-img w-full h-[350px] lg:h-[290px] 2xl:h-[330px] rounded overflow-hidden">
                <NavLink to={`/product/${product.id}`} className="h-full w-full">
                    <img className='w-full h-full object-cover' src={product.images[0]} alt={product.title} />
                </NavLink>
            </div>
            <div className="product-details w-full mt-2 leading-tight">
                <NavLink to={`/product/${product.id}`}>
                    <h2 className="txt-medium text-zinc-800 whitespace-nowrap">{product.title}</h2>
                </NavLink>
                <p className="text-zinc-500 txt-medium">{`${product.gender === "men" ? "Men's Shoes" : product.gender === "women" ? "Women's Shoes" : "Unisex Shoes"}`}</p>
                <p className="text-zinc-500 txt-medium capitalize text-[0.85rem]">{`${product.sport ? product.sport : "sneaker"}`}</p>
                <div className="price-wishlist flex justify-between pr-5">
                    <p className="product-price mt-3 text-[1.050rem] txt-medium flex gap-[1ch] items-center">{`₹ ${priceCorrection(discountCalculator(product.price, product.discount))}.00`}<span className='text-orange-800 text-[0.95rem]'>{`-${product.discount}%`}</span></p>
                    <div className="cart-product-wishlist">
                        <button className="cart-product-wishlist-button flex justify-center items-center text-zinc-900 w-[40px] h-[40px] rounded-full hover:bg-zinc-300 transition-all duration-300 border border-zinc-300" onClick={() => wishlistHandler(product.id, processing, dispatch, navigate)}>{ wishlist && wishlist.filter(item => item.id === product.id).length > 0 ? <RiHeartFill className='text-[1.2rem] text-zinc-800' /> : <RiHeartLine className='text-[1.2rem] text-zinc-800' />}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishlistProduct