import React from 'react'
import { TfiSearch } from "react-icons/tfi";
import {CiUser ,CiHeart, CiShoppingCart } from "react-icons/ci";
import { NavLink } from 'react-router-dom';


const RightNav = () => {
    const navItems = [
        {
            name: "user",
            icon: CiUser,
            path: '/user'
        },
        {
            name: "wishlist",
            icon: CiHeart,
            path: "/user/wishlist"
        },
        {
            name: "cart",
            icon: CiShoppingCart,
            path: "/user/cart"
        }
    ]
    return (
        <div className='w-[40%] hidden lg:flex gap-[1rem] items-center justify-end'>
            <div className="searchbar relative">
                <input className='w-[35ch] py-1.5 px-3 pr-[2rem] rounded border-none outline-none bg-[#e0e0e0] placeholder:text-[0.90rem] placeholder:text-[#525252] text-[#525252] text-[0.90rem]' type="text" placeholder='Find your next step here...' />
                <TfiSearch className='absolute top-[50%] -translate-y-[50%] right-0 text-[1.1rem] text-[#383838] mr-[0.5rem]' />
            </div>
            <nav className='flex gap-[1rem]'>
                {
                    navItems.map(({ path, icon: Icon, name }) => (
                        <NavLink
                        key={name + "nav"}
                        to={path}
                        className="hover:text-[#464646] duration-300"
                        >
                            <Icon className='text-[1.45rem]' />
                        </NavLink>
                    ))
                }
            </nav>
        </div>
    )
}

export default RightNav