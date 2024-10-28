import React from 'react'
import { Link } from 'react-router-dom'
import BrandItem from './BrandItem'

const Brands = () => {
  const brands = [
    {
      label: 'puma',
      logo: '../../../../../assets/logo/puma_black.png',
      bg: '../../../../../assets/brands/puma-min.jpg',
      col: "lg:col-span-4 col-span-8",
      row: "row-span-2",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/puma"
    },
    {
      label: 'nike',
      logo: '../../../../../assets/logo/nike_black.png',
      bg: '../../../../../assets/brands/nike-min.jpg',
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-4 row-span-2",
      height: "lg:h-full h-[200px]",
      path: "shop/brands/nike"
    },
    {
      label: 'adidas',
      logo: '../../../../../assets/logo/adidas_black.png',
      bg: '../../../../../assets/brands/adidas-min.jpg',
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-4 row-span-2",
      height: "lg:h-full h-[180px]",
      path: "shop/brands/adidas"
    },
    {
      label: 'reebok',
      logo: '../../../../../assets/logo/reebok_black.png',
      bg: '../../../../../assets/brands/reebok-min.jpg',
      col: "lg:col-span-2 col-span-4",
      row: "lg:row-span-2 row-span-4",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/reebok"
    },
    {
      label: 'fila',
      logo: '../../../../../assets/logo/fila_black.png',
      bg: '../../../../../assets/brands/fila-min.jpg',
      col: "lg:col-span-2 col-span-4",
      row: "row-span-2",
      height: "lg:h-full h-[110px]",
      path: "shop/brands/fila"
    },
    {
      label: 'calvin klein',
      logo: '../../../../../assets/logo/ck_black.png',
      bg: '../../../../../assets/brands/ck-min.jpg',
      col: "col-span-4",
      row: "row-span-2",
      height: "lg:h-full h-[100px]",
      path: "shop/brands/ck"
    }
  ]
  return (
    <section className='brands-section w-full px-5 mt-[18vh] lg:mt-20'>
      <h2 className="text-[1.6rem] font-medium text-zinc-900 mb-[5vh] border-b-[2px] border-zinc-700 w-fit leading-none capitalize">Pupular Brands</h2>
      <div className="brand-list w-full h-[80vh] max-h-[600px] grid grid-cols-8 grid-rows-6 lg:gap-5 gap-3">
        {
          brands.map(item => (
            <BrandItem item={item} />
          ))
        }
      </div>
    </section>
  )
}

export default Brands