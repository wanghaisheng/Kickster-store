import React, { useEffect, useMemo, useRef, useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { CiUser, CiHeart } from "react-icons/ci";
import { LiaUserShieldSolid } from "react-icons/lia";
import { PiBagLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { discountCalculator, priceCorrection } from "../universal/priceCorrection";


const RightNav = () => {
  const user = useSelector((state) => state.loggedInUser.user);
  const adminId = useSelector((state) => state.loggedInUser.admin);
  const cartItems = useSelector(state => state.cart.cartItems);
  const [searchItems, setSearchItems] = useState([]);
  const [search, setSearch] = useState("");
  const products = useSelector(state => state.products.data);
  const searchRef = useRef(null);

  useMemo(() => {
    if (products) {
      if(search === ""){
        setSearchItems([]);
      }
      else if("shoes".startsWith(search.toLowerCase())){
        setSearchItems(products);
      }
      else{
        const filteredProducts = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.brand.toLowerCase().startsWith(search.toLowerCase()) || "sneaker".startsWith(search.toLowerCase()) || item.gender.toLowerCase().startsWith(search.toLowerCase()))
        setSearchItems(filteredProducts);
      }
    }
  }, [search, products])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchItems([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef])

  return (
    <div className="w-[40%] hidden lg:flex gap-[1rem] items-center justify-end">
      <div className="searchbar-container relative" ref={searchRef}>
        <div className="searchbar relative">
          <input
            className="w-[35ch] py-1.5 px-3 pr-[2rem] rounded border-none outline-none bg-[#e0e0e0] placeholder:text-[0.90rem] placeholder:text-[#525252] text-[#525252] text-[0.90rem]"
            type="text"
            placeholder="Find your next step here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TfiSearch className="absolute top-[50%] -translate-y-[50%] right-0 text-[1.1rem] text-[#383838] mr-[0.5rem]" />
        </div>
        {
          searchItems.length > 0 &&
          <div className="search-list absolute z-20 top-[6vh] left-0 w-full h-fit max-h-[210px] rounded bg-white border border-zinc-200 p-2 overflow-y-auto custom-scroller">
            {
              searchItems.map(item => (
                <NavLink
                  key={item.id}
                  className="flex gap-1 h-[80px] w-full pt-3"
                  to={`/product/${item.id}`}>
                    <img className="h-full w-[70px] rounded object-cover flex-shrink-0" src={item.images[0]} alt="" />
                    <div className="search-product-details">
                        <p className="search-product-title text-zinc-900 txt-medium text-[0.90rem]">{item.title}</p>
                        <p className="search-product-price text-zinc-900 txt-medium text-[0.90rem]">{`₹ ${priceCorrection(discountCalculator(item.price, item.discount))}`}</p>
                      <p className="text-[0.90rem] text-zinc-500 txt-medium">{`${item.gender === "men" ? "Men's Shoes" : item.gender === "women" ? "Women's Shoes" : "Unisex Shoes"}`}</p>
                    </div>
                </NavLink>
              ))
            }
          </div>
        }
      </div>
      <nav className="flex gap-[1rem]">
        <NavLink
          to={user ? (user.id === adminId ? "/admin" : "/user") : "/login"}
          className="hover:text-[#525252] duration-300"
        >
          {user ? (
            user.id === adminId ? (
              <LiaUserShieldSolid className="text-[1.45rem]" />
            ) : (
              <CiUser className="text-[1.45rem]" />
            )
          ) : (
            <CiUser className="text-[1.45rem]" />
          )}
        </NavLink>
        <NavLink
          to="/user/wishlist"
          className={`hover:text-[#525252] duration-300 ${user ? (user.id === adminId ? "hidden" : "block") : "block"
            }`}
        >
          <CiHeart className="text-[1.45rem]" />
        </NavLink>
        <NavLink
          to="/user/bag"
          className={`hover:text-[#525252] duration-300 relative ${user ? (user.id === adminId ? "hidden" : "block") : "block"
            }`}
        >
          <PiBagLight className="text-[1.45rem]" />
          <span className={`${cartItems && cartItems.length === 0 && "hidden"} absolute bottom-0 right-[-5px] flex justify-center items-center text-[0.55rem] w-[16px] h-[16px] rounded-full bg-zinc-800 text-zinc-100 txt-medium`}>{cartItems && cartItems.length}</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default RightNav;
