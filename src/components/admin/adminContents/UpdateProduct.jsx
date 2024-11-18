import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";

const UpdateProduct = ({ action = "update", data = null }) => {
  const [reveal, setReveal] = useState(false);
  const [productCategory, setProductCategory] = useState("Select");

  const productCategorySetter = (option) => {
    setProductCategory(option);
    setReveal(false);
  };

  return (
    <div className="w-full h-[84vh] bg-white flex justify-center py-5">
      <div className="form-container w-1/2 rounded-md p-5">
        <h2 className="font-semibold text-[24px] pb-[2vmax] border-b-2 border-b-zinc-400">
          Update Product
        </h2>
        <form className="grid grid-cols-6 gap-[16px] mt-[24px]">
          <div className="input-container col-span-4">
            <label htmlFor="#product-title">Title</label>
            <input type="text" id="#product-title" />
          </div>
          <div className="input-container col-span-2">
            <label htmlFor="#product-price">Price</label>
            <div className="price-inp-container w-full relative overflow-hidden">
              <input className="w-full" type="number" id="#product-price" />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
                <LiaRupeeSignSolid />
              </span>
            </div>
          </div>
          <div className="input-container col-span-6">
            <label htmlFor="#product-desc">Description</label>
            <input type="text" id="#product-desc" />
          </div>
          <div className="col-span-2">
            <label>Category</label>
            <div className="category relative w-full">
              <span
                onClick={() => setReveal((prev) => !prev)}
                className="flex justify-between items-center w-full border border-zinc-400 rounded py-1 px-3"
              >
                {productCategory}
                <RiArrowDownSLine className="text-[1.2rem]" />
              </span>
              <div
                className={`category-options ${
                  !reveal && "hidden"
                } w-full border-2 border-zinc-200 bg-zinc-200 rounded absolute left-0 top-[40px]`}
              >
                <span
                  onClick={() => productCategorySetter("Men's Shoes")}
                  className="block p-3 font-medium hover:bg-white duration-300 transition-all"
                >
                  Men's Shoe
                </span>
                <span
                  onClick={() => productCategorySetter("Women's Shoes")}
                  className="block p-3 font-medium mt-2 hover:bg-white duration-300 transition-all"
                >
                  Women's Shoe
                </span>
              </div>
            </div>
          </div>
          <div className="input-container col-span-2">
            <label htmlFor="#product-brand">Brand</label>
            <input type="text" id="#product-brand" />
          </div>
          <div className="input-container col-span-2">
            <label htmlFor="#product-dis">Discount</label>
            <div className="dis-inp-container w-full relative overflow-hidden">
              <input className="w-full" type="number" id="#product-dis" />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
                %
              </span>
            </div>
          </div>

          <div className="input-container col-span-2">
            <label htmlFor="#product-stock">Stock</label>
            <input type="number" id="#product-stock" />
          </div>

          {/* Product Images */}
          <div className="col-span-4">
            <label>Images</label>
            <input className="image-inp" type="file" multiple />
          </div>
          <div className="input-container product-new-input col-span-1 mt-[18px]">
            <label htmlFor="#product-brand inline-block">New</label>
            <div className="check">
                <span className="check w-[25px] h-[25px] flex justify-center items-center border border-zinc-400 rounded text-green-600 text-[1.2rem]">
                    <MdDone />
                </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;