import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../../../store/features/cartSlice';
import { priceStringToInt } from '../../../universal/priceCorrection';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseConfigures';

const ProductBtns = ({ btn, product }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);


  const addCartWishlistItem = async () => {
    setIsDisabled(true);
    if (btn === "cart") {
      try {
        const user = await auth.currentUser;
        await setDoc(doc(db, carts, user.uid), {
          cart:[...cart, {...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price)}]
        })
        dispatch(setCartItems({ ...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price) }));
        toast.success("Product added to cart!");
      }
      catch (error) {
        toast.error(error.code);
      }
      finally {
        setIsDisabled(false);
      }
    }
  }

  return (
    <button
      onClick={addCartWishlistItem}
      className={`${btn === "cart" ? "bg-zinc-900 text-[#f9f9f9]" : "border border-zinc-400"} w-full flex justify-center py-4 rounded-full mt-2 txt-medium text-[1.125] ${isDisabled ? "opacity-60" : "opacity-100"}`}
      disabled={isDisabled}
    >
      {btn === "cart" ? (cartItems?.some(item => item.id === product.id) ? "Added!" : "Add to Bag") : "Add to Wishlist"}
    </button>
  )
}

export default ProductBtns