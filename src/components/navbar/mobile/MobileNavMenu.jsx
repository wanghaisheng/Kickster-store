import React from "react";

//Icons
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { TbLetterB } from "react-icons/tb";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { PiPackage } from "react-icons/pi";
import { PiUsers } from "react-icons/pi";
import { PiShoppingBag } from "react-icons/pi";
import { LiaPowerOffSolid } from "react-icons/lia";
import { LiaUserShieldSolid } from "react-icons/lia";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import signOut from "../../signOut";

const MobileNavMenu = ({ reveal, setReveal }) => {
  const user = useSelector((state) => state.loggedInUser.user);

  const navs = [
    {
      icon: IoIosMale,
      label: "Men",
      path: "/shop/men",
    },
    {
      icon: IoIosFemale,
      label: "Women",
      path: "/shop/women",
    },
    {
      icon: HiOutlineRectangleGroup,
      label: "Collections",
      path: "/collections",
    },
    {
      icon: TbLetterB,
      label: "Brands",
      path: "/brands",
    },
    {
      icon: CiUser,
      label: "Account",
      path: "/login",
    },
    {
      icon: CiShoppingCart,
      label: "Cart",
      path: "/user/cart",
    }
  ];
  const adminNavs = [
    {
      label: "products",
      path: "/admin/products",
      icon: PiPackage,
    },
    {
      label: "users",
      path: "/admin/users",
      icon: PiUsers,
    },
    {
      label: "orders",
      path: "/admin/orders",
      icon: PiShoppingBag,
    },
    {
        label: "Admin",
        path: "/admin",
        icon: LiaUserShieldSolid,
      },
  ];
  return (
    <div
      className={`hamburger-menu absolute w-[95vw] p-5 ${
        reveal ? "h-[27vh] top-[-27vh] opacity-100" : "h-0 top-[10vh] opacity-0"
      } left-[50%] -translate-x-[50%] lg:hidden bg-[#fff] rounded-[10px_10px_0px_0px] border-zinc-100 border-x-2 border-t-2 grid grid-cols-3 gap-5 overflow-hidden transition-all duration-300`}
    >
      {
        navs.map(({ icon: IconBase, label, path }) => (
            <NavLink
            onClick={()=> setReveal(prev => !prev)}
            key={label + "MobileNav"}
            to={path}
            className={`${user ? user.role === "admin" ? "hidden" :  "flex" : "flex"} flex-col justify-center items-center text-zinc-800`}
            >
            <IconBase className="text-[1.5rem] mb-1" />
            <span className="text-[0.9rem]">{label}</span>
            </NavLink>
        ))
      }
      {
        user && user.role === "admin" &&
        adminNavs.map(({ icon: IconBase, label, path }) => (
            <NavLink
            onClick={()=> setReveal(prev => !prev)}
            key={label + "MobileNav"}
            to={path}
            className="flex flex-col justify-center items-center text-zinc-800 capitalize"
            >
            <IconBase className="text-[1.5rem] mb-1" />
            <span className="text-[0.9rem]">{label}</span>
            </NavLink>
        ))
      }
      {
        user && user.role === "admin" &&
        <div
            onClick={()=> {
              signOut();
              setReveal(prev => !prev);
            }}
            className="flex flex-col justify-center items-center text-zinc-800"
            >
            <LiaPowerOffSolid className="text-[1.5rem] mb-1" />
            <span className="text-[0.9rem]">Sign Out</span>
            </div>
      }
    </div>
  );
};

export default MobileNavMenu;
