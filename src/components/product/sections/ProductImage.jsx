import React, { useState } from 'react';



const ProductImage = ({ product }) => {
    const [imgIndex, setImgIndex] = useState(0)

    return (
        product &&
        <section className="product-img-container w-full lg:w-[48%] h-full lg:sticky top-[4rem] flex lg:flex-row flex-col-reverse md:gap-3 lg:gap-5">
            <div className="product-img-map w-full lg:w-[10%] h-[10vh] lg:h-full flex lg:flex-col gap-2">
                {
                    product.images.map((img, index) => (
                        index !== product.images.length - 1 &&
                        <img onClick={() => setImgIndex(index)} className='w-[50px] md:w-[80px] lg:w-full lg:object-cover object-contain rounded' key={index} src={img} alt="Product Image" />
                    ))
                }
            </div>
            <div className="product-img w-full lg:w-[90%]">
                {
                    <img className='w-full h-[45vh] md:h-[65vh] xl:h-[80vh] max-h-[768px] object-cover rounded-md' src={product.images[imgIndex]} alt={`Product Image${imgIndex + 1}`} />
                }
            </div>
        </section>
    )
}

export default ProductImage