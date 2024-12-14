import React from "react";
import { GrAppsRounded } from "react-icons/gr";

const MobileNavRight = ({setReveal}) => {

  return (
    <div id="menu_icon_container" onClick={() => setReveal(prev => !prev)} className="lg:hidden">
      <GrAppsRounded id="mobile_menu_icon" className="menu-icon text-[1.5rem]" />
    </div>
  );
};

export default MobileNavRight;
