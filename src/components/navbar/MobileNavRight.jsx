import React from "react";
import { GrAppsRounded } from "react-icons/gr";

const MobileNavRight = ({mobileNavRevealer}) => {
  return (
    <div onClick={mobileNavRevealer} className="lg:hidden">
      <GrAppsRounded className="menu-icon text-[1.5rem]" />
    </div>
  );
};

export default MobileNavRight;
