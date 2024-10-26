import React, { useState } from 'react';



const ProductImage = ({ product }) => {
    const [ imgIndex, setImgIndex ] = useState(0)

    return (
        <>
            <section className="product-img-container w-[48%] h-full sticky top-[4rem] flex gap-5">
                <div className="product-img-map w-[10%] flex flex-col gap-2">
                    {
                        product.images.map((img, index) => (
                            index !== product.images.length - 1 &&
                            <img onClick={()=>setImgIndex(index)} className='object-cover rounded' key={index} src={img} alt="Product Image" />
                        ))
                    }
                </div>
                <div className="product-img w-[90%]">
                    {
                        <img className='w-full h-[87vh] object-cover rounded-md' src={product.images[imgIndex]} alt={`Product Image${imgIndex + 1}`}/>
                    }
                </div>
            </section>
        </>
    )
}

export default ProductImage