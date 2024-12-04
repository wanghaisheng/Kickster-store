import React from "react";
import { TfiDashboard } from "react-icons/tfi";
import { PiPackage } from "react-icons/pi";
import { PiUsers } from "react-icons/pi";
import { PiShoppingBag } from "react-icons/pi";
import { LiaPowerOffSolid } from "react-icons/lia";
import { RiArrowDownSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import signOut from "../auth/signOut";

const AdminNav = () => {

  const screen = window.innerWidth;
  
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
  ];

  return (
    screen > 600 &&
    <nav className="action-menu sticky top-[54px] w-full flex gap-10 py-3 border-b-[1.5px] border-zinc-200 bg-white z-10 px-5">
      <NavLink
        to="/admin"
        className="flex gap-1 items-center capitalize text-zinc-900 hover:text-zinc-600 transition-all duration-300 text-[0.9rem]"
      >
        <TfiDashboard className="text-[1.2rem]" />
        <span>Dashboard</span>
        <RiArrowDownSLine className="text-[1rem]" />
      </NavLink>
      {adminNavs.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={label + "AdminNav"}
          to={path}
          className="flex gap-1 items-center capitalize text-zinc-900 hover:text-zinc-600 transition-all duration-300 text-[0.9rem]"
        >
          <Icon className="text-[1.2rem]" />
          {label}
          <RiArrowDownSLine className="text-[1rem]" />
        </NavLink>
      ))}
      <div onClick={signOut} className="flex gap-1 items-center capitalize text-zinc-900 hover:text-zinc-600 transition-all duration-300 text-[0.9rem]">
        <LiaPowerOffSolid className="text-[1.2rem]" />
        <span>Sign Out</span>
      </div>
    </nav>
  );
};

export default AdminNav;
