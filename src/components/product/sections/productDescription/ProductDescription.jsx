import React, { useState } from 'react'
import ProductBtns from './ProductBtns';
import ProductReviews from './ProductReviews';

const ProductDescription = ({ product }) => {
    const sizeChart = [
        "uk 2.5",
        "uk 3",
        "uk 3.5",
        "uk 4",
        "uk 4.5",
        "uk 5",
        "uk 5.5",
        "uk 6",
        "uk 6.5",
        "uk 7",
        "uk 7.5",
        "uk 8.5",
        "uk 9.5"
    ]
    const [productSize, setProductSize] = useState('');

    const sizeAdder = (size) => {
        product.sizes.includes(size) && setProductSize(size)
    }
    return (
        <section className='product-description w-[52%] pl-14'>
            <h1 className='product-title text-[1.3rem] text-zinc-900 font-medium'>{product.title}</h1>
            <span className="product-category block text-[1rem] text-zinc-600 font-medium">{product.category}</span>
            <span className="product-price block mt-3 text-[1.1rem]">{`MRP : ₹ ${product.price}`}</span>
            <p className='text-zinc-600 text-[0.9rem] mt-3 font-medium'>Inclusive of all taxes<br />(Also includes all applicable duties)</p>
            <div className="size-chart mt-5">
                <h2 className='text-[1.1rem] mb-2'>Select Size</h2>
                <div className="sizes grid grid-cols-4 w-[80%] gap-3">
                    {
                        sizeChart.map((size) => (
                            <span onClick={()=> sizeAdder(size)} key={`size-${size}`} className={`size ${product.sizes.includes(size)? 'opacity-100' : 'opacity-60 bg-zinc-200 border-zinc-300'} ${productSize === size ? "border-zinc-900" : "border-zinc-300"} py-2 border rounded uppercase font-medium text-center`}>{size}</span>
                        ))
                    }
                </div>
            </div>
            <div className="product-btns w-[80%] mt-14">
                <ProductBtns btn={"cart"} />
                <ProductBtns />
            </div>
            <p className="product-story w-[80%] mt-[10vh] font-medium">
                {product.description}
            </p>
            <img className='w-[80%] object-cover mt-[5vh]' src={product.images[product.images.length-1]} alt="" />
            <ProductReviews reviews={product.reviews} />
        </section>
    )
}

export default ProductDescription