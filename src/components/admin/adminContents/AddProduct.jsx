import React, { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";
import { useForm } from "react-hook-form";
import app from "../../../utils/firebaseConfigures";
import {
  collection,
  doc,
  getFirestore,
  setDoc
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as s_ref,
  uploadBytes
} from "firebase/storage";
import { uuid } from "../../../utils/uuid";

const AddProduct = () => {
  const [reveal, setReveal] = useState(false);
  const [productCategory, setProductCategory] = useState("Select");
  const [newProduct, setNewProduct] = useState(false);
  const [ productImg, setProductImg ] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const productCategorySetter = (option) => {
    setProductCategory(option);
    setReveal(false);
  };
  const [ id ] = useState(uuid());

  //! Firestore database initialization
  const db = getFirestore(app);
  //! Reference to the Firestore Data Collection
  const colRef = collection(db, "products");
  // Storage Initialization
  // const storage = getStorage(app);

  const formHandler = async(data) => {
    // const productImgURL = [];
    
    // Uploading the data to the storage by the name of Data ID
    // productImg &&
    // productImg.forEach(async(img, index) => {
    //   Reference to the Storage Data
    //   const storageRef = s_ref(storage, `products/${data.title}/${id}${index}`);
    //   await uploadBytes(storageRef, img);
    //   Getting the Storage Data URL
    //   productImgURL.push(await getDownloadURL(storageRef));
    // })

    //! Adding the data to Firestore Collection with the Data ID as the document ID
    await setDoc(doc(colRef, `${data.id}`), {
      id: id,
      title: data.title,
      images: productImg,
      category: productCategory,
      description: data.description,
      stock: data.stock,
      discount: data.discount,
      new: newProduct,
      brand: data.brand
    })
    console.log("Success!");
    reset();
  }

  return (
    <div className="w-full h-[84vh] bg-white flex justify-center py-5">
      <div className="form-container w-1/2 rounded-md p-5">

        {/* Form Header */}
        <h2 className="font-semibold text-[24px] pb-[2vmax] border-b-2 border-b-zinc-400">
          Add Product
        </h2>

        {/* ....................... FORM ........................ */}
        <form onSubmit={handleSubmit(data => formHandler(data))} className="grid grid-cols-6 gap-[16px] mt-[24px]">

          {/* Title */}
          <div className="input-container col-span-4">
            <label htmlFor="#product-title">Title</label>
            <input {...register("title")} required type="text" id="#product-title" />
          </div>

          {/* Price */}
          <div className="input-container col-span-2">
            <label htmlFor="#product-price">Price</label>
            <div className="price-inp-container w-full relative overflow-hidden">
              <input {...register("price")} className="w-full" required type="number" id="#product-price" />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
                <LiaRupeeSignSolid />
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="input-container col-span-6">
            <label htmlFor="#product-desc">Description</label>
            <input {...register("description")} required type="text" id="#product-desc" />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label>Category</label>
            <div className="category relative w-full">
              <span onClick={() => setReveal((prev) => !prev)} className="flex justify-between items-center w-full border border-zinc-400 rounded py-1 px-3">
                {productCategory}
                <RiArrowDownSLine className="text-[1.2rem]" />
              </span>
              <div className={`category-options ${!reveal && "hidden"} w-full border-2 border-zinc-200 bg-zinc-200 rounded absolute left-0 top-[40px]`}>
                <span onClick={() => productCategorySetter("Men's Shoes")} className="block p-3 font-medium hover:bg-white duration-300 transition-all">
                  Men's Shoe
                </span>
                <span onClick={() => productCategorySetter("Women's Shoes")} className="block p-3 font-medium mt-2 hover:bg-white duration-300 transition-all">
                  Women's Shoe
                </span>
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="input-container col-span-2">
            <label htmlFor="#product-brand">Brand</label>
            <input {...register("brand")} required type="text" id="#product-brand" />
          </div>

          {/* Discount */}
          <div className="input-container col-span-2">
            <label htmlFor="#product-dis">Discount</label>
            <div className="dis-inp-container w-full relative overflow-hidden">
              <input {...register("discount")} className="w-full" required type="number" id="#product-dis" />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
                %
              </span>
            </div>
          </div>

          {/* Product Stock */}
          <div className="input-container col-span-2">
            <label htmlFor="#product-stock">Stock</label>
            <input {...register("stock")} required type="number" id="#product-stock" />
          </div>

          {/* Product Images */}
          {/* <div className="col-span-4">
            <label>Images</label>
            <input onChange={(e)=> setProductImg([...e.target.files])} className="image-inp w-full" required type="file" multiple />
          </div> */}

          <div className="col-span-4">
            <label>Images</label>
            <input onChange={(e)=> setProductImg([...e.target.files])} className="image-inp w-full" required type="file" multiple />
          </div>

          {/* New Checkbox */}
          <div className="input-container product-new-input col-span-1 mt-[18px]">
            <label htmlFor="#product-brand inline-block">New</label>
            <div onClick={()=> setNewProduct(prev => !prev)} className="check">
              <span className="check w-[25px] h-[25px] flex justify-center items-center border border-zinc-400 rounded text-green-600 text-[1.2rem]">
                {
                  newProduct?
                  <MdDone /> : ""
                }
              </span>
            </div>
          </div>

          {/* Product Buttons */}
          <div className="add-product-btns col-span-6">
          <button className="w-[10vw] min-w-[150px] py-[5px] rounded border border-zinc-800 mr-[24px]" type="submit">Cancel</button>
          <button className="w-[10vw] min-w-[150px] py-[5px] bg-zinc-800 rounded text-zinc-100" type="submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
