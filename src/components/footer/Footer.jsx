import React from 'react'

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
        { label: "github repository", path: "/contact" },
        { label: "faq", path: "/faq" },
        { label: "returns", path: "/returns" },
        { label: "shipping", path: "/shipping" },
        { label: "terms & conditions", path: "/terms-conditions" }
      ]
    }
  ]
  return (
    <footer className='w-full px-10'>
      <div className="footer-links grid grid-cols-5">
          
      </div>
      <span className='block'>@2024 Kickster, Inc. All rights reserved.</span>
    </footer>
  )
}

export default Footer