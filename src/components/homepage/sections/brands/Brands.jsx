import React from 'react'
import BrandItem from './BrandItem'
import puma from '../../../../../assets/logo/puma_black.png';
import pumaBg from '../../../../../assets/brands/puma-min.jpg';
import nike from '../../../../../assets/logo/nike_black.png';
import nikeBg from '../../../../../assets/brands/nike-min.jpg';
import adidas from '../../../../../assets/logo/adidas_black.png';
import adidasBg from '../../../../../assets/brands/adidas-min.jpg';
import reebok from '../../../../../assets/logo/reebok_black.png';
import reebokBg from '../../../../../assets/brands/reebok-min.jpg';
import fila from '../../../../../assets/logo/fila_black.png';
import filaBg from '../../../../../assets/brands/fila-min.jpg';
import ck from '../../../../../assets/logo/ck_black.png';
import ckBg from '../../../../../assets/brands/ck-min.jpg';
const Brands = () => {
  const brands = [
    {
      label: 'puma',
      logo: puma,
      bg: pumaBg,
      col: "lg:col-span-4 col-span-8",
      row: "row-span-2",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/puma"
    },
    {
      label: 'nike',
      logo: nike,
      bg: nikeBg,
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-4 row-span-2",
      height: "lg:h-full h-[200px]",
      path: "shop/brands/nike"
    },
    {
      label: 'adidas',
      logo: adidas,
      bg: adidasBg,
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-4 row-span-2",
      height: "lg:h-full h-[180px]",
      path: "shop/brands/adidas"
    },
    {
      label: 'reebok',
      logo: reebok,
      bg: reebokBg,
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-2 row-span-4",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/reebok"
    },
    {
      label: 'fila',
      logo: fila,
      bg: filaBg,
      col: "lg:col-span-2 col-span-4",
      row: "row-span-2",
      height: "lg:h-full h-[110px]",
      path: "shop/brands/fila"
    },
    {
      label: 'calvin klein',
      logo: ck,
      bg: ckBg,
      col: "col-span-4",
      row: "row-span-2",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/ck"
    }
  ]

  return (
    <section className='brands-section w-full px-5 mt-[18vh]'>
      <h2 className="section-heading text-[1.6rem] font-medium text-zinc-900 mb-[5vh] border-b-[2px] border-zinc-700 w-fit h-fit overflow-hidden leading-none">
        <span className='sec-heading-txt block'>Pupular Brands</span>
      </h2>
      <div className="brand-list w-full h-[80vh] max-h-[600px] grid grid-cols-8 grid-rows-6 lg:gap-5 gap-3">
        {
          brands.map(item => (
            <BrandItem key={`${item.label.trim()}_brand`} item={item} />
          ))
        }
      </div>
    </section>
  )
}

export default Brands