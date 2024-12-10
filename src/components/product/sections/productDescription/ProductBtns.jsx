import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../../../store/features/cartSlice';
import { priceStringToInt } from '../../../universal/priceCorrection';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../../utils/firebaseConfigures';
import { useNavigate } from 'react-router-dom';

const ProductBtns = ({ btn, product }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const adminId = useSelector(state => state.loggedInUser.admin);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState({
    cart: false,
    wishlist: false
  });
  const navigate = useNavigate();
  const user = auth.currentUser;


  const addCartWishlistItem = async () => {
    if (btn === "cart") {
      setIsDisabled(prev => ({...prev, cart: true}));
      try {
        if (user) {
          const docSnap = await getDoc(doc(db,"personalVaults", `${user.uid}`));
          if(docSnap.exists()){
            const cart = docSnap.data().cart;
            if(cart.some(item => item.id === product.id)){
              toast.warning("Product already in cart!");
              return;
            }
            await setDoc(doc(db, "personalVaults", `${user.uid}`), {
              cart: [...cart, {...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price)}]
            })
            dispatch(setCartItems([...cartItems, {...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price) }]));
          }
          else{
            await setDoc(doc(db, "personalVaults", `${user.uid}`), {
              cart : [{...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price)}]
            })
            dispatch(setCartItems([...cartItems, { ...product, quantity: 1, price: priceStringToInt(product.price), totalPrice: priceStringToInt(product.price) }]));
          }
          toast.success("Product added to cart!");
        }
        else {
          toast.error("Please sign in to add to cart!");
          navigate("/login")
        }
      }
      catch (error) {
        toast.error(error.code);
      }
      finally {
        setIsDisabled({cart: true, wishlist: true});
      }
    }
  }

  useEffect(()=>{
    if (user && adminId){
      if(user.uid === adminId){
        setIsDisabled({cart:true, wishlist: true});
      }
    }
  }, [])

  return (
    <button
      onClick={addCartWishlistItem}
      className={`${btn === "cart" ? "bg-zinc-900 text-[#f9f9f9]" : "border border-zinc-400"} w-full flex justify-center py-4 rounded-full mt-2 txt-medium text-[1.125] ${isDisabled.cart ? "opacity-60" : "opacity-100"}`}
      disabled={isDisabled}
    >
      {btn === "cart" ? (cartItems?.some(item => item.id === product.id) ? "Added!" : "Add to Bag") : "Add to Wishlist"}
    </button>
  )
}

export default ProductBtns