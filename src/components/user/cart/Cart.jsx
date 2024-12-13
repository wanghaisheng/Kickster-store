import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loader/Loader';
import { priceCorrection } from '../../universal/priceCorrection';
import { RiDeleteBin5Line } from "react-icons/ri";
import { auth, db } from '../../../utils/firebaseConfigures';
import { doc, setDoc } from 'firebase/firestore';
import { setCartItems } from '../../../store/features/cartSlice';
import { toast } from 'react-toastify';


const Cart = () => {
    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const [processing, setProcessing] = useState(false);

    const quantityHandler = async(action, id) => {
        setProcessing(true);
        const user = auth.currentUser;
        if(user) {
            let updatedCart;
            if(action === "inc"){
                updatedCart = cart.map(item => 
                    item.id === id 
                    ? {...item, quantity: item.quantity + 1, totalPrice: item.price * (item.quantity + 1)} 
                    : item
                );

            }
            else if (action === "dec"){
                updatedCart = cart.map(item => 
                    item.id === id 
                    ? {...item, quantity: item.quantity - 1, totalPrice: item.price * (item.quantity - 1)} 
                    : item
                );
            }
            else{
                updatedCart = cart.filter(item => item.id !== id);
            }
            try{
                await setDoc(doc(db, "carts", `${user.uid}`), {
                    cart : [...updatedCart],
                })
                dispatch(setCartItems(updatedCart));
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }catch(error){
                toast.error(error.message);
            }
            finally{
                setProcessing(false)
            }
        }
    }

  return (
    <section className='cart-section w-[90%] min-h-[400px] mx-auto flex px-5 gap-10 pt-14 relative'>
        <div className={`overlay ${processing ? "block" : "hidden"} w-full h-full opacity-30 absolute top-0 left-0 z-10 bg-zinc-100`}></div>
        <div className="cart-items w-[65%]">
            <h1 className='text-zinc-800 txt-medium text-[1.55rem] mb-5'>Bag</h1>
            {
                !cart ?
                <Loader/>
                :
                cart.map(item => (
                    <div key={item.id} className="flex items-start gap-4 mb-5 pb-[3rem] border-b border-zinc-300">
                        <div className="cart-product-img-quantity flex-shrink-0 w-[160px]">
                        <img src={item.images[0]} alt={item.title} className="w-full h-[160px] object-cover rounded" />
                        <div className="cart-product-quantity w-fit flex justify-center items-center gap-2 rounded-full overflow-hidden border-[1.5px] border-zinc-300 mt-3 txt-medium">
                            <button className="cart-quantity-button flex justify-center items-center flex-shrink-0 text-[1.24rem] text-zinc-800 w-[40px] h-[40px] rounded-full hover:bg-zinc-300 transition-all duration-500" onClick={() => quantityHandler(`${item.quantity === 1 ? "del" : "dec"}`, item.id)}>{item.quantity === 1 ? <RiDeleteBin5Line className='text-[1.2rem] text-zinc-800' /> : "–"}</button>
                            <span className="cart-quantity-number text-zinc-800 txt-medium text-[1.055rem]">{item.quantity}</span>
                            <button className="cart-quantity-button flex justify-center items-center flex-shrink-0 text-[1.22rem] text-zinc-800 w-[40px] h-[40px] rounded-full hover:bg-zinc-300 transition-all duration-500" onClick={() => quantityHandler("inc", item.id)}>+</button>
                        </div>
                        </div>
                        <div className='cart-product-details w-full h-[160px]'>
                            <div className="title-price flex justify-between w-full text-[1.06rem]">
                                <p className="cart-product-title txt-medium">{item.title}</p>
                                <p className="cart-product-price txt-medium">{`MRP: ₹ ${priceCorrection(item.totalPrice)}`}</p>
                            </div>
                            <p className='cart-product-gender txt-medium text-zinc-500'>{item.gender === "men" ? "Men's Shoes" : item.gender === "women" ? "Women's Shoes" : "Unisex Shoes"}</p>
                            <p className="cart-product-type capitalize txt-medium text-zinc-500">{item.sneaker ? "Sneakers" : item.sport}</p>
                            <p className="cart-product-size txt-medium text-zinc-500">Size : <span className='underline'>{item.selectedSize}</span></p>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="checkout w-[30%]">

        </div>
    </section>
  )
}

export default Cart