import React, { useEffect, useState, useRef } from 'react';
import Filters from './sections/Filters';
import List from './sections/List';
import { useParams } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { discountCalculator } from '../universal/priceCorrection';
import { IoCloseOutline } from "react-icons/io5";



const ProductList = () => {

    const filteredProducts = useSelector((state) => state.filters.filteredProducts);
    const [filtered, setFiltered] = useState(null);
    const [sorting, setSorting] = useState(null);
    const screen = window.innerWidth;
    const [reveal, setReveal] = useState({
        filter: false,
        sort: false
    });

    const { filter } = useParams();
    const sortOptions = [
        {
            label: "None",
            value: "all"
        },
        {
            label: "Price : Low - High",
            value: "low-high"
        },
        {
            label: "Price : High - Low",
            value: "high-low"
        }
    ];

    const sortMethodHandler = (value) => {
        setSorting(value);
        localStorage.setItem("sorting", JSON.stringify(value));
    };

    useEffect(() => {
        if (sorting, filteredProducts)
            setFiltered(sort(filteredProducts, sorting));
    }, [sorting, filteredProducts]);

    useEffect(() => {
        if (localStorage.getItem("sorting")) {
            setSorting(JSON.parse(localStorage.getItem("sorting")));
        }
    }, []);

    const sort = (arr, method) => {
        if (arr.length <= 1 || method === "all")
            return arr;

        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];

        for (let i = 1; i < arr.length; i++) {
            if (method === "low-high") {
                if (discountCalculator(arr[i].price, arr[i].discount) < discountCalculator(pivot.price, pivot.discount))
                    leftArr.push(arr[i]);
                else
                    rightArr.push(arr[i]);
            } else {
                if (discountCalculator(arr[i].price, arr[i].discount) > discountCalculator(pivot.price, pivot.discount))
                    leftArr.push(arr[i]);
                else
                    rightArr.push(arr[i]);
            }
        }

        return [...sort(leftArr, method), pivot, ...sort(rightArr, method)];
    };


    return (
        <section className='product-list-page w-full relative'>
            <div className={`sorting sticky top-0 lg:top-[8.5vh] bg-white z-10 w-full py-[1vh] lg:py-[2vh] px-5 mb-2 lg:mb-0 flex items-center ${screen < 640 ? "justify-between" : "justify-end"}`}>
                <div className="filter-btn max-w-[180px] w-[45%] relative lg:hidden">
                    <span onClick={() => setReveal(prev => ({ ...prev, filter: !prev.filter }))} className='flex w-fit gap-2 items-center p-2 pl-0 txt-medium'>Filters <IoIosArrowDown /></span>
                </div>

                <div className="sort-btn max-w-[180px] w-[45%] relative flex justify-end">
                    <span onClick={() => setReveal(prev => ({ ...prev, sort: !prev.sort }))} className='flex w-fit gap-2 items-center p-2 pr-0 txt-medium'>Sort By <IoIosArrowDown /></span>
                    <ul className={`absolute ${reveal.sort ? "block" : "hidden"} top-[6vh] left-0 bg-[#e6e6e6d3] backdrop-blur-md rounded w-full z-10 border-zinc-200 border-2`}>
                        {
                            sortOptions.map((option, index) => (
                                <li onClick={() => sortMethodHandler(option.value)} className={`p-2 ${option.value === sorting && "bg-[#f9f9f9]"} txt-medium text-[0.9rem] hover:bg-[#f9f9f9] transition-all duration-300 ${index === 0 ? "border-b" : index === 1 && "border-b"} border-zinc-300`} key={option.label}>
                                    {option.label}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <section className='filter-list-content w-full min-h-[88lvh] flex gap-[3vw] px-5 relative bg-white'>
                <Filters reveal={reveal}/>
                <List filteredProducts={filtered} />
            </section>
        </section>
    )
}

export default ProductList