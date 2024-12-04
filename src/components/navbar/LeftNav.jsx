import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    const navItems = [
        {
            label: 'Men',
            path: '/shop/men'
        },
        {
            label: "Women",
            path: "/shop/women"
        },
        {
            label: "Brands",
            path: "/brands"
        },
        {
            label: "SNKRS",
            path: "/shop/sneaker"
        }
    ]
    return (
        <nav className='w-[40%] hidden lg:flex gap-[2rem] uppercase text-[0.95rem]'>
            {
                navItems.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.label + "nav"}
                        className="hover:text-[#555555] duration-300"
                    >
                        {item.label}
                    </NavLink>
                ))
            }
        </nav>
    )
}

export default LeftNav