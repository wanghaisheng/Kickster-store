import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Filters = (filterAdder) => {

  const [expand, setExpand] = useState({
    gender: true,
    kids: true,
    size: true,
    price: true,
    brand: true,
    collection: true
  });

  const [filter, setFilter] = useState();

  const options = [
    {
      label: "gender",
      values: ["men", "women", "unisex"]
    },
    {
      label: "size",
      values: ["2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"]
    },
    {
      label: "price",
      values: ["under ₹2,500", "₹2,500 - ₹5,000", "₹5,000 - ₹7,500", "₹7,500 - ₹10,000", "over ₹10,000"]
    },
    {
      label: "brand",
      values: ["nike", "puma", "adidas"]
    },
    {
      label: "collection",
      values: ["running", "basketball", "football", "training & gym"]
    }

  ];

  const toggleExpand = (label) => {
    setExpand(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  }
  return (
    <section className='product-filter-section custom-scroller w-[20%] h-[88vh] overflow-y-auto pb-10 pr-5 sticky top-[-1vh]'>
      {
        options.map((option) => (
          <div key={`${option.label}Filter`} className='product-filter-option w-full border-b-zinc-200 border-b capitalize text-[1.05rem] text-zinc-800'>
            <span onClick={() => toggleExpand(option.label)} className='option-label flex justify-between items-center h-[8vh]'>
              <h2 className='txt-medium'>{option.label}</h2>
              {
                expand[option.label]? <IoIosArrowUp className='text-[1.2rem]' /> : <IoIosArrowDown className='text-[1.2rem]' />
              }
            </span>
            <ul className={`m-0 p-0 ${expand[option.label] ? "h-fit pb-3" : "h-0 py-0"} ${option.label === "size" && "grid grid-cols-3 place-items-center gap-2"} overflow-hidden transition-all duration-500`}>
              {
                option.values.map((value) => (
                  <li className={`${option.label === "size" && "text-[0.95rem] rounded border border-zinc-500 w-full flex justify-center"} py-1 font-normal`} key={`${option.label} ${value}`}>{`${option.label === "size" ? "UK" : ""}${value}`}</li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </section>
  )
}

export default Filters