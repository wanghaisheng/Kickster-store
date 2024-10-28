import React from 'react'
import { Link } from 'react-router-dom'

const BrandItem = ({ item }) => {
  return (
    <div className={`brand-item ${item.col} ${item.row} rounded-xl overflow-hidden relative`}>
      <Link to={item.path}>
        <img className='brand-item-bg w-full h-full object-cover' src={item.bg} alt="" />
        <div className="logo-bg w-full h-full absolute top-0 left-0 bg-[#ffffff93] flex justify-center items-center">
          <img className={`${item.height}`} src={item.logo} alt="" />
        </div>
      </Link>
    </div>
  )
}

export default BrandItem