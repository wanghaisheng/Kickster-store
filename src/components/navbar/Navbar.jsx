import React from 'react'
import LeftNav from './LeftNav'
import RightNav from './RightNav'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <section className='hidden bg-[#fff] navbar-section w-full max-w-screen-2xl sticky lg:flex justify-center backdrop-blur-3xl z-[99] top-0 left-0'>
      <div className="navigation-container container w-full flex justify-between items-center px-5 py-2">
        <LeftNav />
        <div className="logo uppercase text-[1.5rem] text-zinc-800"><NavLink to='/'>Kickster</NavLink></div>
        <RightNav />
      </div>
    </section>
  )
}

export default Header