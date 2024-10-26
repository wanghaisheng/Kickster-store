import React from 'react'

const ProductBtns = ({btn}) => {
  return (
    <button
        className={`${btn === "cart" ? "bg-zinc-900 text-[#f9f9f9]" : "border border-zinc-500"} w-full flex justify-center py-4 rounded-full mt-2 font-medium text-[1.125]`}
    >
        {btn === "cart" ? "Add to Bag" : "Add to Wishlist"}
    </button>
  )
}

export default ProductBtns