import React from 'react'
import { RiGithubFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      heading: "shop",
      links: [
        { label: "men", path: "/shop/men" },
        { label: "women", path: "/shop/women" },
        { label: "kids", path: "/shop/kids" },
        { label: "collections", path: "/collections" },
        { label: "brands", path: "/brands" },
        { label: "trends", path: "/trends" }
      ]
    },
    {
      heading: "customer",
      links: [
        { label: "my account", path: "/user" },
        { label: "order history", path: "/user/orders" },
        { label: "wishlist", path: "/user/wishlist" },
        { label: "cart", path: "/user/cart" }
      ]
    },
    {
      heading: "project",
      links: [
        { label: "tech stack", path: "/techstack" },
        { label: "github repository", path: "/https://github.com/falguni-mondal/Kickster" },
        { label: "story", path: "/story" }
      ]
    }
  ]
  const creator = {
    heading: "Creator",
    links: [
      { name: "creatorGithub", icon: RiGithubFill, path: "https://github.com/falguni-mondal" },
      { name: "creatorLinkedIn", icon: FaLinkedinIn, path: "https://www.linkedin.com/in/falguni-mondal/" },
    ]
  }

  return (
    <footer className='w-full px-5 pb-0 mt-20'>
      <div className="footer-links grid grid-cols-5 pb-20 pt-14 border-t-[1px] border-t-zinc-300">
        <div className="the-app col-span-2 flex flex-col justify-between">
          <div className="website">
            <h1 className='logo uppercase text-[3rem] mb-8 leading-none'><Link to="/">Kickster</Link></h1>
            <p className='w-[28ch] text-[0.9rem]'>Discover branded footwear to kickstart your wardrobe, one step at a time —</p>
          </div>
          <div className="footer-heading creator-dets flex flex-col">
            <h2 className='font-semibold'>{creator.heading}</h2>
            <div className="creator-links text-zinc-700 flex items-center gap-3 mt-1">
              <Link>Portfolio</Link>
              <span>|</span>
              {
                creator.links.map(({ name, icon: Icon, path }) => (
                  <Link key={name} to={path} target="_blank" rel="noopener noreferrer"><Icon className='text-[1.2rem]' /></Link>
                ))
              }
            </div>
          </div>
        </div>
        {
          footerLinks.map(item => (
            <div key={item.heading} className="footer-heading">
              <h2 className='font-semibold capitalize text-[0.95rem]'>{item.heading}</h2>
              <ul className="flex flex-col gap-3 mt-3">
                {
                  item.links.map(({ label, path }) => (
                    <li key={label}><Link className='capitalize text-zinc-700 text-[0.95rem]' to={path}>{label}</Link></li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
      <span className='block py-8 border-t border-t-zinc-400 text-zinc-700 text-[0.95rem]'>©2024 Kickster. All rights reserved.</span>
    </footer>
  )
}

export default Footer