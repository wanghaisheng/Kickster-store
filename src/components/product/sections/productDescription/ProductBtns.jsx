import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../../../utils/firebaseConfigures';
import { useNavigate } from 'react-router-dom';
import { cartHandler, wishlistHandler } from '../../../user/cart/CartAndWishlist';

const ProductBtns = ({ btn, product, size }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const adminId = useSelector(state => state.loggedInUser.admin);
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const CartWishlistHandler = async () => {
    if (btn === "cart") {
      cartHandler(product, size, setProcessing, dispatch, navigate)
    }
    else {
      wishlistHandler(product, setProcessing, dispatch, navigate);
    }
  }


  useEffect(() => {
    if (user && adminId && user.uid === adminId) {
      setProcessing({ cart: true, wishlist: true });
    }
  }, [user, adminId]);


  return (
    <button
      onClick={CartWishlistHandler}
      className={`${btn === "cart" ? "bg-zinc-900 text-[#f9f9f9]" : "border border-zinc-400"} w-full flex justify-center py-4 rounded-full mt-2 txt-medium text-[1.125] ${processing ? "opacity-60" : "opacity-100"}`}
      disabled={processing}
    >
      {btn === "cart" ? (cartItems && cartItems.some(item => item.id === product.id) ? "Remove from Bag" : "Add to Bag") : (wishlist && wishlist.some(item => item.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist")}
    </button>
  )
}

export default ProductBtns