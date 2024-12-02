import React, { useState, useEffect, useRef } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";
import { useForm } from "react-hook-form";
import { db } from "../../../../utils/firebaseConfigures";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { uuid } from "../../../../utils/uuid";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUpdateProduct = () => {
  const [reveal, setReveal] = useState(false);
  const [gender, setGender] = useState("Select");
  const [genderError, setGenderError] = useState("");
  const genderRef = useRef(null);
  const [sportReveal, setSportReveal] = useState(false);
  const [sport, setSport] = useState("Select Sport");
  const [sportError, setSportError] = useState("");
  const sportRef = useRef(null);
  const [newProduct, setNewProduct] = useState(false);
  const [imgReveal, setImgReveal] = useState(false);
  const imageRef = useRef(null);
  const [ sizes, setSizes] = useState([]);
  const [ sizesError, setSizesError] = useState([]);
  const [uid, setUid] = useState(uuid());
  const { id } = useParams();
  // Product data for updating
  const [product, setProduct] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      images: ["", "", "", "", ""],
    },
  });

  const genderSetter = (option) => {
    setGender(option);
    setGenderError("");
    setReveal(false);
  };
  const sportSetter = (option) => {
    setSport(option);
    setSportError("");
    setSportReveal(false);
  };
  const shoeSizeSetter = (size) => {
    if (!sizes.includes(size)) {
      setSizes([...sizes, size]);
      setSizesError("");
    } else {
      const updatedSizes = sizes.filter((s) => s!== size);
      setSizes(updatedSizes);
    }
  }

  // Reference to the Firestore Data Collection
  const colRef = collection(db, "products");

  const navigate = useNavigate();
  const cancellationHandler = () => {
    navigate("/admin/products");
  };

  const priceCorrection = (orgPrice) => {
    const price = parseInt(orgPrice);
    if (price < 1000) return orgPrice.toString();
    const commaPos = parseInt(price / 1000).toString().length;
    let priceArray = [...orgPrice];
    priceArray.splice(commaPos, 0, ",");
    return priceArray.join("");
  };

  //  FORM HANDLER
  const formHandler = async (data) => {
    if (gender === "Select") {
      setGenderError("Please select a gender");
      return;
    }
    if (sport === "Select Sport") {
      setSportError("Please select a sport");
      return;
    }
    if (sizes.length === 0) {
      setSizesError("Please select sizes");
      return;
    }
    const price = priceCorrection(data.price);

    if (id) {
      // Updating the data to Firestore Collection with the Data ID as the document ID
      await setDoc(doc(colRef, `${id}`), {
        ...product,
        title: data.title,
        images: [...data.images],
        gender,
        sport,
        description: data.description,
        stock: parseInt(data.stock),
        discount: parseInt(data.discount),
        new: newProduct,
        brand: data.brand,
        price,
        sizes,
      });
      toast("✔️ Updated successfully!");
    }
    else {
      // Adding the data to Firestore Collection with the Data ID as the document ID
      await setDoc(doc(colRef, `${uid}`), {
        id: uid,
        title: data.title,
        images: [...data.images],
        gender,
        sport,
        description: data.description,
        stock: parseInt(data.stock),
        discount: parseInt(data.discount),
        new: newProduct,
        brand: data.brand,
        price,
        reviews: [],
        rating : 0,
        sales: 0,
        sizes,
      });
      setUid(uuid());
      setGender("Select");
      setSport("Select Sport");
      setSizes([]);
      setNewProduct(false);
      reset();
      toast.success("Added successfully!");
    }
  };

  // Fetching product data for updating
  const updateProductFetcher = async (productId) => {
    const docRef = doc(colRef, productId);
    const docSnap = await getDoc(docRef);
    const productData = docSnap.data();
    setProduct(productData);
    
    // Set form values when product data is fetched
    if (productData) {
      productData.images.forEach((url, index) => {
        setValue(`images.${index}`, url);
      });
      setGender(productData.gender);
      setSport(productData.sport);
      setSizes(productData.sizes);
      setNewProduct(productData.new);
      setValue("title", productData.title);
      setValue("description", productData.description);
      setValue("stock", productData.stock);
      setValue("discount", productData.discount);
      setValue("brand", productData.brand);
      setValue("price", stringToInt(productData.price));
      setValue("sizes", productData.sizes.join(", "));
    }
  };

  const stringToInt = (value) => {
    const intArray = value.split(",").map((price) => parseInt(price));
    return intArray.join("");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genderRef.current && !genderRef.current.contains(event.target)) {
        setReveal(false);
      }
      if (imageRef.current && !imageRef.current.contains(event.target)) {
        setImgReveal(false);
      }
      if (sportRef.current && !sportRef.current.contains(event.target)) {
        setSportReveal(false);
      }
    };

    // Calling productFetcher function for updating if ID is provided in the URL
    if (id) {
      updateProductFetcher(id);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  return (
    <div className="w-full min-h-[84vh] bg-white flex justify-center py-5">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
         />
      <div className="form-container w-full lg:w-1/2 rounded-md p-5">
        {/* Form Header */}
        <h2 className="txt-medium text-[24px] pb-[2vmax] border-b-2 border-b-zinc-400">
          {
            id ? "Update Product" : "Add Product"
          }
        </h2>

        {/* ....................... FORM ........................ */}
        <form
          onSubmit={handleSubmit(formHandler)}
          className="grid grid-cols-8 gap-[16px] mt-[24px]"
        >
          {/* Title */}
          <div className="input-container col-span-8 lg:col-span-6">
            <label htmlFor="#product-title">Title (min: 10 characters)</label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 10,
                  message: "Title must be at least 10 characters",
                },
                validate: (value) =>
                  value.trim() !== "" || "Title cannot be only spaces",
              })}
              type="text"
              id="#product-title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="input-container col-span-8 lg:col-span-2">
            <label htmlFor="#product-price">Price</label>
            <div className="price-inp-container w-full relative overflow-hidden">
              <input
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be greater than 0",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Price must be a valid number",
                  },
                })}
                className="w-full"
                type="number"
                id="#product-price"
              />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200 rounded">
                <LiaRupeeSignSolid />
              </span>
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="input-container col-span-8">
            <label htmlFor="#product-desc">
              Description (min: 20 characters)
            </label>
            <input
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                validate: (value) =>
                  value.trim() !== "" || "Description cannot be only spaces",
              })}
              type="text"
              id="#product-desc"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="col-span-4 lg:col-span-2">
            <label>Gender</label>
            <div className="gender relative w-full" ref={genderRef}>
              <span
                onClick={() => setReveal((prev) => !prev)}
                className="flex justify-between items-center w-full border border-zinc-400  rounded py-1.5 px-3"
              >
                {gender === "men" ? "Men's" : gender === "women" ? "Women's" : gender === "unisex" ? "Unisex" : gender}
                <RiArrowDownSLine className="text-[1.2rem]" />
              </span>
              <div
                className={`gender-options ${!reveal && "hidden"
                  } w-full border-2 border-zinc-200 bg-[#dadada9c] backdrop-blur-md rounded absolute left-0 top-[40px] z-10`}
              >
                {["men", "women", "unisex"].map((gender) => (
                  <span
                    key={gender}
                    onClick={() => genderSetter(gender)}
                    className={`block px-3 py-2 txt-medium ${gender === "unisex" ? "" : "border-b border-b-zinc-300"} hover:bg-white duration-300 transition-all`}
                  >
                    {
                      gender === "men" ? "Men's" : gender === "women" ? "Women's" : "Unisex"
                    }
                  </span>
                ))}
              </div>
            </div>
            {genderError && (
              <p className="text-red-500 text-sm">{genderError}</p>
            )}
          </div>

          {/* Brand */}
          <div className="input-container col-span-4 lg:col-span-2">
            <label htmlFor="#product-brand">Brand</label>
            <input
              {...register("brand", {
                required: "Brand is required",
                validate: (value) =>
                  value.trim() !== "" || "Brand cannot be only spaces",
              })}
              type="text"
              id="#product-brand"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          {/* Discount */}
          <div className="input-container col-span-4 lg:col-span-2">
            <label htmlFor="#product-dis">Discount</label>
            <div className="dis-inp-container w-full relative overflow-hidden">
              <input
                {...register("discount", {
                  required: "Discount is required",
                  min: {
                    value: 0,
                    message: "Discount cannot be negative",
                  },
                  max: {
                    value: 100,
                    message: "Discount cannot exceed 100%",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Discount must be a valid number",
                  },
                })}
                className="w-full"
                type="number"
                id="#product-dis"
              />
              <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200 rounded">
                %
              </span>
            </div>
            {errors.discount && (
              <p className="text-red-500 text-sm">{errors.discount.message}</p>
            )}
          </div>

          {/* Product Stock */}
          <div className="input-container col-span-4 lg:col-span-2">
            <label htmlFor="#product-stock">Stock</label>
            <input
              {...register("stock", {
                required: "Stock is required",
                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Stock must be a valid number",
                },
              })}
              type="number"
              id="#product-stock"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

            {/* SPORT */}
          <div className="col-span-4 lg:col-span-3">
            <label>Sport</label>
            <div className="sport relative w-full" ref={sportRef}>
              <span
                onClick={() => setSportReveal((prev) => !prev)}
                className="flex justify-between items-center w-full border border-zinc-400  rounded py-1.5 px-3 capitalize"
              >
                {sport}
                <RiArrowDownSLine className="text-[1.2rem]" />
              </span>
              <div
                className={`sport-options ${!sportReveal && "hidden"
                  } w-full border-2 border-zinc-200 bg-[#dadada9c] backdrop-blur-md rounded absolute left-0 top-[40px] z-10 h-[8rem] overflow-y-auto custom-scroller`}
              >
                {["running", "football", "basketball", "training & gym", "sneakers", "lifestyle"].map((sport, index) => (
                  <span
                    key={`${sport}_option`}
                    onClick={() => sportSetter(sport)}
                    className={`block px-3 py-2 txt-medium ${index === sport.length -1 ? "" : "border-b border-b-zinc-300"} hover:bg-white duration-300 transition-all capitalize`}
                  >
                    {
                      sport
                    }
                  </span>
                ))}
              </div>
            </div>
            {sportError && (
              <p className="text-red-500 text-sm">{sportError}</p>
            )}
          </div>

          {/* Product Images */}
          <div className="col-span-8 lg:col-span-5">
            <label>Images</label>
            <div className="productImg relative w-full" ref={imageRef}>
              <span
                onClick={() => setImgReveal((prev) => !prev)}
                className="flex justify-between items-center w-full border border-zinc-400 rounded py-1.5 px-3"
              >
                <span>Select Images</span>
                <RiArrowDownSLine className="text-[1.2rem]" />
              </span>
              <div
                className={`image-url-inputs ${!imgReveal && "hidden"
                  } w-full border-2 p-2 border-zinc-200 bg-[#dadada9c] backdrop-blur-md absolute left-0 top-[40px] flex flex-col gap-1 rounded z-[2]`}
              >
                {["", "", "", "", ""].map((item, index) => (
                  <input
                    {...register(`images.${index}`, {
                      required: "All image URLs are required",
                      pattern: {
                        value: /^(http|https):\/\/.+$/i,
                        message: "Please enter a valid URL",
                      },
                      validate: (value) =>
                        value.trim() !== "" ||
                        "Image URL cannot be only spaces",
                    })}
                    key={`product_image_${index}${item}`}
                    className="product-img-inp placeholder:text-zinc-600 placeholder:text-[0.9rem]"
                    type="url"
                    placeholder={`${index !== 4 ? `Image ${index + 1}` : "Model"
                      }`}
                  />
                ))}
              </div>
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm">
                All image URLs must be valid image files
              </p>
            )}
          </div>

          {/* Shoe Sizes */}
          <div className="input-container col-span-8">
            <label htmlFor="#product-sizes">
              Shoe Sizes
            </label>
            <ul className="sizes-list-container grid grid-cols-4 lg:grid-cols-6 gap-2 place-items-center">
              {
                ["2.5","3","3.5","4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"].map(size => (
                  <li onClick={() => shoeSizeSetter(size)} className={`w-full flex justify-center items-center ${sizes.filter(item => item === size)[0] ? "opacity-100 border-[1.5px]" : "opacity-50 border"} rounded py-1.5 border-zinc-800`}>{`UK ${size}`}</li>
                ))
              }
            </ul>
            {sizesError && (
              <p className="text-red-500 text-sm">{sizesError}</p>
            )}
          </div>

          {/* New Checkbox */}
          <div className="input-container product-new-input col-span-2 lg:col-span-1 mt-[18px]">
            <label htmlFor="#product-brand inline-block">New</label>
            <div
              onClick={() => setNewProduct((prev) => !prev)}
              className="check"
            >
              <span className="check w-[25px] h-[25px] flex justify-center items-center border border-zinc-400 rounded text-green-600 text-[1.2rem]">
                {newProduct && <MdDone />}
              </span>
            </div>
          </div>

          {/* Product Buttons */}
          <div className="add-product-btns col-span-8">
            <button
              onClick={cancellationHandler}
              className="w-[10vw] min-w-[145px] py-[7px] rounded border border-zinc-800 mr-[24px]"
              type="button"
            >
              Cancel
            </button>
            <button
              className="w-[10vw] min-w-[145px] py-[7px] bg-zinc-800 rounded text-zinc-100 disabled:bg-zinc-400"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? id ? "Updating..." : "Adding" : id ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
