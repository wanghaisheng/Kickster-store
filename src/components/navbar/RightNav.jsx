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

  const navItems = [
    {
      name: "wishlist",
      icon: CiHeart,
      path: "/user/wishlist",
    },
    {
      name: "cart",
      icon: PiBagLight,
      path: "/user/cart",
    },
  ];
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
        {navItems.map(({ path, icon: Icon, name }) => (
          <NavLink
            key={name + "nav"}
            to={path}
            className={`hover:text-[#525252] duration-300 ${
              user ? (user.id === adminId ? "hidden" : "block") : "block"
            }`}
          >
            <Icon className="text-[1.45rem]" />
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default RightNav;
