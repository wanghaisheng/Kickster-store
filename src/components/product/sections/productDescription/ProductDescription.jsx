import React, { useState } from 'react'
import ProductBtns from './ProductBtns';
import ProductReviews from './ProductReviews';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../../utils/firebaseConfigures';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { priceCorrection, priceStringToInt } from '../../../universal/priceCorrection';

const ProductDescription = ({ product }) => {
    const user = auth.currentUser;
    const navigate = useNavigate()
    const sizeChart = [
        "2.5",
        "3",
        "3.5",
        "4",
        "4.5",
        "5",
        "5.5",
        "6",
        "6.5",
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10"
    ]
    const [productSize, setProductSize] = useState('');

    const sizeAdder = (size) => {
        product.sizes.includes(size) && setProductSize(size)
    }

    // const addToCartWishlist = async (action) => {
    //     if (user) {
    //         if (productSize) {
    //             const cart = JSON.parse(localStorage.getItem(("cart")));
    //             const wishlist = JSON.parse(localStorage.getItem(("wishlist")));
    //             if (cart || wishlist) {
    //                 localStorage.setItem(JSON.stringify(`${action === "cart" ? "cart" : "wishlist"}`, action === "cart" ? [...cart, {
    //                     title: product.title,
    //                     price: product.price,
    //                     totalPrice: product.price,
    //                     size: productSize,
    //                     quantity: 1,
    //                     image: product.images[0],
    //                     user: user.id,
    //                     id: product.id
    //                 }]
    //                 :

    //             ));
    //             }
    //             else {
    //                 localStorage.setItem(JSON.stringify("cart", [{
    //                     title: product.title,
    //                     price: product.price,
    //                     totalPrice: product.price,
    //                     size: productSize,
    //                     quantity: 1,
    //                     image: product.images[0],
    //                     user: user.id,
    //                     id: product.id
    //                 }]));
    //             }
    //             const uid = user.uid;
    //             const userRef = doc(db, 'user', uid);
    //             setDoc(userRef, {
    //                 cart: [...cart, {
    //                     title: product.title,
    //                     price: product.price,
    //                     totalPrice: product.price,
    //                     size: productSize,
    //                     quantity: 1,
    //                     image: product.images[0],
    //                     user: user.id,
    //                     id: product.id
    //                 }]
    //             }, { merge: true });
    //         }
    //         else{
    //             toast("Please select a size");
    //         }
    //     }
    //     else {
    //         navigate("/login")
    //         toast("Please login with your account.");
    //     }
    // }

    return (
        product &&
        <section className='product-description w-full lg:w-[52%] lg:pl-14'>
            <h1 className='product-title text-[1.3rem] text-zinc-900 txt-medium'>{product.title}</h1>
            <span className="product-category block text-zinc-500 txt-medium">{product.gender === "men" ? "Men's Shoes" : product.gender === "women" ? "Women's Shoes" : "Unisex Shoes"}</span>
            <p className="text-zinc-500 txt-medium capitalize">{`${product.sport ? product.sport : "sneaker"}`}</p>
            <p className="product-price mt-3 text-[1.1rem] txt-medium flex gap-[1ch] items-center">{`₹ ${priceCorrection(Math.round(priceStringToInt(product.price) - (priceStringToInt(product.price) * product.discount) / 100))}.00`} <span className='text-zinc-500 text-[0.95rem]'>{`MRP : ₹ ${product.price}.00`}</span> <span className='text-orange-800 text-[0.95rem]'>{`-${product.discount}%`}</span></p>
            <p className='text-zinc-500 text-[0.9rem] mt-3 txt-medium'>Inclusive of all taxes<br />(Also includes all applicable duties)</p>
            <div className="size-chart mt-5 w-full">
                <h2 className='text-[1.2rem] mb-2 txt-medium'>Select Size</h2>
                <div className="sizes grid grid-cols-4 w-full lg:w-[80%] gap-3">
                    {
                        sizeChart.map((size) => (
                            <span onClick={() => sizeAdder(size)} key={`size-${size}`} className={`size ${product.sizes.includes(size) ? 'opacity-100' : 'opacity-60 bg-zinc-200 border-zinc-300'} ${productSize === size ? "border-zinc-900" : "border-zinc-300"} py-2 border-[1.5px] rounded uppercase text-center`}>uk {size}</span>
                        ))
                    }
                </div>
            </div>
            <div className="product-btns w-full lg:w-[80%] mt-14">
                <ProductBtns btn={"cart"} product={product} />
                <ProductBtns />
            </div>
            <p className="product-story w-full lg:w-[80%] mt-[10vh]">
                {product.description}
            </p>
            <img className='w-full lg:w-[80%] object-cover mt-[5vh]' src={product.images[product.images.length - 1]} alt="" />
            <ProductReviews reviews={product.reviews} />
        </section>
    )
}

export default ProductDescription