import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../../../store/features/cartSlice';
import { discountCalculator } from '../../../universal/priceCorrection';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../../utils/firebaseConfigures';
import { useNavigate } from 'react-router-dom';

const ProductBtns = ({ btn, product, size }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const adminId = useSelector(state => state.loggedInUser.admin);
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState({
    cart: false,
    wishlist: false
  });
  const navigate = useNavigate();
  const user = auth.currentUser;

  const CartWishlistHandler = async () => {
    if (btn === "cart") {
      setIsDisabled(prev => ({ ...prev, cart: true }));
      try {
        if (user) {
          const docSnap = await getDoc(doc(db, "carts", `${user.uid}`));
          if (docSnap.exists()) {
            const cart = docSnap.data().cart;
            //Checking if the product is in the cart already
            if (cart.some(item => item.id === product.id)) {
              //REMOVING CART ITEM
              const updatedCart = cart.filter(item => item.id !== product.id);
              await setDoc(doc(db, "carts", `${user.uid}`), { cart: updatedCart });
              dispatch(setCartItems(updatedCart));
              localStorage.setItem("cart", JSON.stringify(updatedCart));
              toast.success("Product removed from bag!");
              return;
            }
            //ADDING CART ITEM
            if(!size){
              toast.error("Please select a size!");
              return;
            }
            const updatedCart = [...docSnap.data().cart, { ...product, quantity: 1, price: discountCalculator(product.price, product.discount), totalPrice: discountCalculator(product.price, product.discount), selectedSize : size }]
            await setDoc(doc(db, "carts", `${user.uid}`), {
              cart: updatedCart
            });
            dispatch(setCartItems(updatedCart));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product added to bag!");
          }
          else {
            if(!size){
              toast.error("Please select a size!");
              return;
            }
            //ADDING FIRST CART ITEM
            const updatedCart = [{ ...product, quantity: 1, price: discountCalculator(product.price, product.discount), totalPrice: discountCalculator(product.price, product.discount), selectedSize : size }]
            await setDoc(doc(db, "carts", `${user.uid}`), {
              cart: updatedCart
            });
            dispatch(setCartItems(updatedCart));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product added to bag!");
          }
        }
        else {
          toast.error("Please sign in to add to bag!");
          navigate("/login");
        }
      }
      catch (error) {
        toast.error(error.message || "An error occurred");
      }
      finally {
        setIsDisabled(prev => ({ ...prev, cart: false }));
      }
    }
  }


  useEffect(() => {
    if (user && adminId && user.uid === adminId) {
      setIsDisabled({ cart: true, wishlist: true });
    }
  }, [user, adminId]);


  return (
    <button
      onClick={CartWishlistHandler}
      className={`${btn === "cart" ? "bg-zinc-900 text-[#f9f9f9]" : "border border-zinc-400"} w-full flex justify-center py-4 rounded-full mt-2 txt-medium text-[1.125] ${isDisabled.cart ? "opacity-60" : "opacity-100"}`}
      disabled={isDisabled.cart}
    >
      {btn === "cart" ? (cartItems && cartItems.some(item => item.id === product.id) ? "Remove from Bag" : "Add to Bag") : "Add to Wishlist"}
    </button>
  )
}

export default ProductBtns