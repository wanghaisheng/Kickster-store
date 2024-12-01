import React, { useEffect, useState } from 'react'
import ProductImage from './sections/ProductImage'
import ProductDescription from './sections/productDescription/ProductDescription'
import ProductCards from '../universal/ProductCards'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseConfigures'
import Loader from '../loader/Loader'

const Product = () => {

  const [ product, setProduct ] = useState(null)
  const { id } = useParams();


  const productFetcher = async (productId) => {
    // Reference to the Firestore Data Collection
    const colRef = collection(db, "products");
    const docRef = doc(colRef, productId);
    const docSnap = await getDoc(docRef);
    const productData = docSnap.data();
    setProduct(productData)
  }

  useEffect(()=> {
    productFetcher(id)
  }, [])

  
  const recommendations = [
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "001",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "002",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "003",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "004",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "005",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "006",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
    {
      "images": [
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3db2e706-40e9-4ee4-a87c-9b908f4f3db2/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d909366-7b6d-4581-90f0-b53dde469d0f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/34e37efb-e6be-4933-853c-8b7f5cb17d74/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7cfbc171-dc9d-4163-b71a-b351f590726f/NIKE+AIR+MAX+PULSE+ROAM.png",
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3ce4af74-07cb-4080-95db-61fa9b35a3a8/NIKE+AIR+MAX+PULSE+ROAM.png"
      ],
      "brand": "nike",
      "reviews": [
        {
          "date": "06/10/24",
          "rating": 5,
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "name": "Akku",
          "id": "001r001"
        },
        {
          "comment": "Abcdefghijklmnopqrstuvwxyz",
          "date": "21/10/24",
          "name": "Bivash",
          "rating": 5,
          "id": "001r002"
        }
      ],
      "id": "007",
      "discount": 23,
      "rating": 5,
      "price": "14,270",
      "stock": 5,
      "title": "Nike Air Max Pulse Roam",
      "new": true,
      "category": "Men's Shoes",
      "description": "The Air Max Pulse Roam takes cues from its stylish forerunner and moves it in a more utilitarian direction. This means durability without the discomfort and style without the effort. Visible Air cushioning—revamped from the incredibly plush Air Max 270—delivers the comfort you've come to trust."
    },
  ]

  return (
    !product ?
    <Loader /> :
    <section className='product-page w-full pt-5 lg:pt-[4.5rem] relative flex flex-col items-center bg-[#fff]'>
      <div className="product-details w-full lg:flex lg:flex-row flex-col px-4 lg:px-10">
        <ProductImage product={product} />
        <ProductDescription product={product} />
      </div>
      <section className="product-wearing-section w-full mt-10 lg:mt-5 px-5 lg:px-10">
        <h2 className='product-wearing-heading capitalize txt-medium text-[1.45rem]'>How others are wearing it</h2>
        <p className='text-[0.95rem] mt-2'>Upload your photo or mension @kickster on instagram for a chance to be featured</p>
        <button className='rounded-full bg-[#fff] px-6 lg:px-4 py-2 lg:py-1 mt-4 border border-zinc-600'>Upload Your Photo</button>
      </section>
      <section className="recommendation-section w-full py-5 px-5 relative mt-[10vh]">
        <ProductCards heading={"you might also like"} cards={recommendations} />
      </section>
    </section>
  )
}

export default Product