import React, { useEffect, useRef, useState } from 'react'
//ICONS
import { RiArrowDownSLine } from "react-icons/ri";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDone } from "react-icons/md";
//Library features
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddUpdateForm = ({ formHandler }) => {

    const [productCategory, setProductCategory] = useState("Select");
    const [newProduct, setNewProduct] = useState(false);
    const [reveal, setReveal] = useState(false);
    const [imgReveal, setImgReveal] = useState(false);
    const categoryRef = useRef(null);
    const imageRef = useRef(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            images: ["", "", "", "", ""],
        },
    });

    const navigate = useNavigate();
    const cancellationHandler = () => {
        navigate("/admin/products");
    };

    const productCategorySetter = (option) => {
        setProductCategory(option);
        setCategoryError("");
        setReveal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setReveal(false);
            }
            if (imageRef.current && !imageRef.current.contains(event.target)) {
                setImgReveal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form
            onSubmit={handleSubmit(formHandler)}
            className="grid grid-cols-8 gap-[16px] mt-[24px]"
        >
            {/* Title */}
            <div className="input-container col-span-6">
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
                    autoFocus
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            {/* Price */}
            <div className="input-container col-span-2">
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
                    <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
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

            {/* Category */}
            <div className="col-span-2">
                <label>Category</label>
                <div className="category relative w-full" ref={categoryRef}>
                    <span
                        onClick={() => setReveal((prev) => !prev)}
                        className="flex justify-between items-center w-full border border-zinc-400  rounded py-1 px-3"
                    >
                        {productCategory}
                        <RiArrowDownSLine className="text-[1.2rem]" />
                    </span>
                    <div
                        className={`category-options ${!reveal && "hidden"
                            } w-full border-2 border-zinc-200 bg-[#dadada9c] backdrop-blur-md rounded absolute left-0 top-[40px] z-10`}
                    >
                        {["Men's Shoes", "Women's Shoes"].map((category) => (
                            <span
                                key={category}
                                onClick={() => productCategorySetter(category)}
                                className="block p-3 font-medium text-[0.95rem] hover:bg-white duration-300 transition-all"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                {categoryError && (
                    <p className="text-red-500 text-sm">{categoryError}</p>
                )}
            </div>

            {/* Brand */}
            <div className="input-container col-span-2">
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
            <div className="input-container col-span-2">
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
                    <span className="rupee-icon w-[30px] h-full flex justify-center items-center absolute top-[50%] -translate-y-[50%] bg-zinc-200">
                        %
                    </span>
                </div>
                {errors.discount && (
                    <p className="text-red-500 text-sm">{errors.discount.message}</p>
                )}
            </div>

            {/* Product Stock */}
            <div className="input-container col-span-2">
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

            {/* Product Images */}
            <div className="col-span-4">
                <label>Images</label>
                <div className="productImg relative w-full" ref={imageRef}>
                    <span
                        onClick={() => setImgReveal((prev) => !prev)}
                        className="flex justify-between items-center w-full border border-zinc-400 rounded py-1 px-3"
                    >
                        <span>Select Images</span>
                        <RiArrowDownSLine className="text-[1.2rem]" />
                    </span>
                    <div
                        className={`image-url-inputs ${!imgReveal && "hidden"
                            } w-full border-2 p-2 border-zinc-200 bg-[#dadada9c] backdrop-blur-md absolute left-0 top-[40px] flex flex-col gap-1 rounded`}
                    >
                        {["", "", "", "", ""].map((item, index) => (
                            <input
                                {...register(`images.${index}`, {
                                    required: "All image URLs are required",
                                    pattern: {
                                        value:
                                            /^(http|https):\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
                                        message:
                                            "Please enter a valid image URL (.jpg, .png, .gif, .webp)",
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
            <div className="input-container col-span-4">
                <label htmlFor="#product-sizes">
                    Shoe Sizes "2 - 10" (comma-separated)
                </label>
                <input
                    {...register("sizes", {
                        required: "Sizes are required",
                        pattern: {
                            value: /^(\d+(\.\d+)?\s*,\s*)*\d+(\.\d+)?$/,
                            message: "Please enter valid comma-separated numbers",
                        },
                        validate: (value) =>
                            value.trim() !== "" || "Sizes cannot be only spaces",
                    })}
                    type="text"
                    id="#product-sizes"
                />
                {errors.sizes && (
                    <p className="text-red-500 text-sm">{errors.sizes.message}</p>
                )}
            </div>

            {/* New Checkbox */}
            <div className="input-container product-new-input col-span-1 mt-[18px]">
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
                    className="w-[10vw] min-w-[150px] py-[5px] rounded border border-zinc-800 mr-[24px]"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className="w-[10vw] min-w-[150px] py-[5px] bg-zinc-800 rounded text-zinc-100 disabled:bg-zinc-400"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding..." : "Add Product"}
                </button>
            </div>
        </form>
    )
}

export default AddUpdateForm