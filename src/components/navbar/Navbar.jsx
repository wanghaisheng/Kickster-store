import React, { useState } from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { NavLink } from "react-router-dom";
import MobileLeftNav from "./mobile/MobileLeftNav";
import MobileNavRight from "./mobile/MobileNavRight";
import MobileNavMenu from "./mobile/MobileNavMenu";

const Header = () => {
  const [ reveal, setReveal ] = useState(false)
  const mobileNavRevealer = () =>{
    setReveal(prev => !prev)
    console.log("hello");
    
  }
  return (
    <section className="bg-[#fff] navbar-section w-full max-w-screen-2xl fixed bottom-0 lg:sticky lg:flex justify-center backdrop-blur-3xl z-[99] lg:top-0 left-0 shadow-lg lg:shadow-none lg:border-b-[1.5px] lg:border-zinc-200 shadow-black">
      <div className="navigation-container h-[6.5vh] relative lg:h-fit container w-full flex justify-between items-center px-5 py-2">
        <LeftNav />
        <MobileLeftNav />
        <div className="logo uppercase text-[1.2rem] font-medium lg:text-[1.5rem] text-zinc-800">
          <NavLink to="/">Kickster</NavLink>
        </div>
        <RightNav />
        <MobileNavRight mobileNavRevealer={mobileNavRevealer} />
        <MobileNavMenu reveal={reveal} setReveal={setReveal} />
      </div>
    </section>
  );
};

export default Header;
