import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = ({filterAdder}) => {
    const navItems = [
        {
            label: 'men',
            filter: "gender",
            path: '/shop/men'
        },
        {
            label: "women",
            filter: "gender",
            path: "/shop/women"
        },
        {
            label: "brands",
            path: "/brands"
        },
        {
            label: "SNKRS",
            filter : "sneaker",
            path: "/shop/sneaker"
        }
    ]
    return (
        <nav className='w-[40%] hidden lg:flex gap-[2rem] uppercase text-[0.95rem]'>
            {
                navItems.map(item => (
                    <NavLink
                        onClick={() => item.filter && filterAdder(item.filter, item.label)}
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