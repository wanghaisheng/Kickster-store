import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import WishlistProduct from './WishlistProduct';
import shopping from "../../../../assets/images/shopping.png";
import { useNavigate } from 'react-router-dom';


const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    return (
        <div className='wishlist-container w-full lg:w-[90%] mx-auto min-h-[400px] pt-3 lg:pt-14 px-5 relative'>
            <div className={`${processing ? "block" : "hidden"} overflow absolute w-full h-full top-0 left-0 z-20 bg-[#ffffffa4]`}></div>
            <h1 className='text-zinc-950 text-[1.55rem] font-medium tracking-tight mb-5'>Wishlist</h1>
            <div className="wishlist-products flex flex-wrap gap-5">
                {
                    !wishlist ?
                        <Loader />
                        :
                        !wishlist.length > 0 ?
                            <div className="empty-cart flex flex-col items-center w-full mt-5">
                                <img className='w-[25%] object-cover' src={shopping} alt="" />
                                <h2 className='text-[1.6rem] text-zinc-500 mt-3'>Your Wishlist Seems Empty!</h2>
                                <button className="w-[200px] h-[50px] rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-500 text-white font-medium text-[1.06rem] text-center mt-3" onClick={() => navigate("/shop")}>Start Shopping</button>
                            </div>
                            :
                            wishlist.map((item, key) => (
                                <WishlistProduct key={key} product={item} processing={setProcessing} />
                            ))
                }
            </div>
        </div>
    )
}

export default Wishlist