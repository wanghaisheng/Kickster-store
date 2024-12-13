import React from "react";
import { TfiSearch } from "react-icons/tfi";
import { CiUser, CiHeart } from "react-icons/ci";
import { LiaUserShieldSolid } from "react-icons/lia";
import { PiBagLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const RightNav = () => {
  const user = useSelector((state) => state.loggedInUser.user);
  const adminId = useSelector((state) => state.loggedInUser.admin);
  const cartItems = useSelector(state => state.cart.cartItems);


  return (
    <div className="w-[40%] hidden lg:flex gap-[1rem] items-center justify-end">
      <div className="searchbar relative">
        <input
          className="w-[35ch] py-1.5 px-3 pr-[2rem] rounded border-none outline-none bg-[#e0e0e0] placeholder:text-[0.90rem] placeholder:text-[#525252] text-[#525252] text-[0.90rem]"
          type="text"
          placeholder="Find your next step here..."
        />
        <TfiSearch className="absolute top-[50%] -translate-y-[50%] right-0 text-[1.1rem] text-[#383838] mr-[0.5rem]" />
      </div>
      <nav className="flex gap-[1rem]">
        <NavLink
          to={user ? (user.id === adminId ? "/admin" : "/user") : "/login"}
          className="hover:text-[#525252] duration-300"
        >
          {user ? (
            user.id === adminId ? (
              <LiaUserShieldSolid className="text-[1.45rem]" />
            ) : (
              <CiUser className="text-[1.45rem]" />
            )
          ) : (
            <CiUser className="text-[1.45rem]" />
          )}
        </NavLink>
        <NavLink
          to="/user/wishlist"
          className={`hover:text-[#525252] duration-300 ${user ? (user.id === adminId ? "hidden" : "block") : "block"
            }`}
        >
          <CiHeart className="text-[1.45rem]" />
        </NavLink>
        <NavLink
          to="/user/bag"
          className={`hover:text-[#525252] duration-300 relative ${user ? (user.id === adminId ? "hidden" : "block") : "block"
            }`}
        >
          <PiBagLight className="text-[1.45rem]" />
          <span className={`${cartItems && cartItems.length === 0 && "hidden"} absolute bottom-0 right-[-5px] flex justify-center items-center text-[0.55rem] w-[16px] h-[16px] rounded-full bg-zinc-800 text-zinc-100 txt-medium`}>{cartItems && cartItems.length}</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default RightNav;
