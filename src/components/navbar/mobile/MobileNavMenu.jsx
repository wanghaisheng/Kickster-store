import React from 'react'

//Icons
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { TbLetterB } from "react-icons/tb";
import {CiUser ,CiHeart, CiShoppingCart } from "react-icons/ci";
import { NavLink } from 'react-router-dom';



const MobileNavMenu = ({reveal}) => {
    const navs = [
        {
            icon: IoIosMale,
            label: "Men",
            path: "/shop/men"
        },
        {
            icon: IoIosFemale,
            label: "Women",
            path: "/shop/women"
        },
        {
            icon: HiOutlineRectangleGroup,
            label: "Collections",
            path: "/collections"
        },
        {
            icon: TbLetterB,
            label: "Brands",
            path: "/brands"
        },
        {
            icon: CiUser,
            label: "Account",
            path: "/user"
        },
        {
            icon: CiShoppingCart,
            label: "Cart",
            path: "/user/cart"
        }
    ]
  return (
    <div className={`hamburger-menu absolute w-[95vw] p-5 ${reveal ? "h-[27vh] top-[-27vh] opacity-100" : "h-0 top-[10vh] opacity-0"} left-[50%] -translate-x-[50%] lg:hidden bg-[#fff] rounded-[10px_10px_0px_0px] border-zinc-100 border-x-2 border-t-2 grid grid-cols-3 gap-5 overflow-hidden transition-all duration-300`}>
          {
            navs.map(({icon: IconBase, label, path}) => (
                <NavLink key={label + "MobileNav"} to={path} className="flex flex-col justify-center items-center text-zinc-800">
                    <IconBase className='text-[1.5rem] mb-1'/>
                    <span className='text-[0.9rem]'>{label}</span>
                </NavLink>
            ))
          }
    </div>
  )
}

export default MobileNavMenu