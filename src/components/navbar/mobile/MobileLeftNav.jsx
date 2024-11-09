import React from 'react'
import { CgSearch } from "react-icons/cg";
import { NavLink } from 'react-router-dom'

const MobileNav = () => {
  return (
    <nav className='lg:hidden'>
        <NavLink to="/search"><CgSearch className='text-[1.5rem]' /></NavLink>
    </nav>
  )
}

export default MobileNav