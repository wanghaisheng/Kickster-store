import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData, setFilteredProducts } from "../../../store/features/filterSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.filters.filterData);
  const products = useSelector((state) => state.products.data);
  const [isFiltered, setIsFiltered] = useState(false);

  const [expand, setExpand] = useState({
    gender: true,
    kids: true,
    size: true,
    price: true,
    brand: true,
    sport: true,
  });

  const toggleExpand = (label) => {
    setExpand((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const options = [
    {
      label: "sneaker",
      value: false,
    },
    {
      label: "gender",
      values: ["men", "women", "unisex"],
    },
    {
      label: "size",
      values: [
        "2.5",
        "3",
        "3.5",
        "4",
        "4.5",
        "5",
        "5.5",
        "6",
        "6.5",
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
      ],
    },
    {
      label: "price",
      values: [
        {
          label: "under ₹2,500",
          range: [null, 2500],
        },
        {
          label: "₹2,500 - ₹5,000",
          range: [2500, 5000],
        },
        {
          label: "₹5,000 - ₹7,500",
          range: [5000, 7500],
        },
        {
          label: "₹7,500 - ₹10,000",
          range: [7500, 10000],
        },
        {
          label: "over ₹10,000",
          range: [10000, null],
        },
      ],
    },
    {
      label: "brand",
      values: ["nike", "puma", "adidas"],
    },
    {
      label: "sport",
      values: [
        "running",
        "lifestyle",
        "basketball",
        "football",
        "training & gym",
      ],
    },
  ];


  const handleFilterChange = (option, value) => {
    if (filterData) {
      if (option === "price") {
        const isPresent = filterData.price.some(
          (range) => range[0] === value[0] && range[1] === value[1]
        );
        dispatch(
          setFilterData({
            ...filterData,
            price: isPresent
              ? filterData.price.filter(
                (range) => !(range[0] === value[0] && range[1] === value[1])
              )
              : [...filterData.price, value],
          })
        );
      } else {
        filterData[option].includes(value)
          ? dispatch(
            setFilterData({
              ...filterData,
              [option]: filterData[option].filter((item) => item !== value),
            })
          )
          : dispatch(
            setFilterData({
              ...filterData,
              [option]: [...filterData[option], value],
            })
          );
      }
    }

    setIsFiltered(true);
  };

  useEffect(() => {
    filterData &&
      dispatch(
        setFilteredProducts(
          products &&
          [
            ...products.filter((product) =>
              Object.keys(filterData).every((section) => {
                if (section === "sneaker") {
                  if (filterData.sneaker === false) return true;
                  return product.sneaker === filterData.sneaker;
                }

                if (section === "sport") {
                  if (product.sneaker) return true;
                  if (filterData.sport.length === 0) return true;
                  return filterData.sports.some((option) =>
                    product.sport?.include(option)
                  );
                }

                if (section === "price") {
                  if (filterData.price.length === 0) return true;
                  return filterData.price.some(
                    ([min, max]) =>
                      min === null &&
                      product.price >= min &&
                      max === null &&
                      product.price <= max
                  );
                }
                if (filterData[section].length === 0) return true;
                return filterData[section].some((option) =>
                  product[section]?.includes(option)
                );
              })
            )
          ]
        )
      );
  }, [filterData])

  useMemo(() => {
    if (!isFiltered) {
      ""
    } else {
      localStorage.setItem("filters", JSON.stringify(filterData));
    }
  }, [filterData]);

  useEffect(() => {
    if (localStorage.getItem("filters")) {
      dispatch(setFilterData(JSON.parse(localStorage.getItem("filters"))));
    }
  }, []);

  return (
    filterData && (
      <section className="product-filter-section custom-scroller w-[20%] h-[88vh] overflow-y-auto pb-10 pr-5 sticky top-[-1vh]">
        {options.map((option) =>
          option.label === "sneaker" ? (
            //! SNEAKER OPTION
            <div
              key="sneakerFilter"
              className="product-filter-option w-full border-b-zinc-200 border-b capitalize text-[1.05rem] text-zinc-800"
            >
              <span
                onClick={() =>
                  dispatch(
                    setFilterData({
                      ...filterData,
                      sneaker: !filterData.sneaker,
                    })
                  )
                }
                className="w-fit flex gap-[1rem] items-center"
              >
                <span className="flex justify-center items-center w-[22px] h-[22px] border border-zinc-400 rounded">
                  <MdDone
                    className={`${filterData && filterData.sneaker ? "" : "hidden"
                      }`}
                  />
                </span>
                <h2 className="option-label flex justify-between items-center h-[8vh] txt-medium">
                  {option.label}
                </h2>
              </span>
            </div>
          ) : (
            <div
              key={`${option.label}Filter`}
              className="product-filter-option w-full border-b-zinc-200 border-b capitalize text-[1.05rem] text-zinc-800"
            >
              <span
                onClick={() => toggleExpand(option.label)}
                className="option-label flex justify-between items-center h-[8vh]"
              >
                <h2 className="txt-medium">{option.label}</h2>
                {expand[option.label] ? (
                  <IoIosArrowUp className="text-[1.2rem]" />
                ) : (
                  <IoIosArrowDown className="text-[1.2rem]" />
                )}
              </span>
              {option.label === "size" ? (
                //! SIZE OPTIONS
                <ul
                  className={`m-0 p-0 ${expand[option.label] ? "h-fit pb-3" : "h-0 py-0"
                    } grid grid-cols-3 place-items-center gap-2 overflow-hidden transition-all duration-500`}
                >
                  {option.values.map((value) => (
                    <li
                      onClick={() => handleFilterChange(option.label, value)}
                      className={` ${filterData.size.includes(value)
                          ? "border-zinc-800"
                          : "border-zinc-400"
                        } text-[0.95rem] rounded border-[1.5px] w-full flex justify-center py-1`}
                      key={`${option.label} ${value}`}
                    >
                      <span
                        className={`flex gap-[1rem] items-center ${filterData.size.includes(value)
                            ? "text-zinc-800"
                            : "text-zinc-400"
                          }`}
                      >
                        {`UK ${value}`}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : option.label === "price" ? ( // Changed from options.label to option.label
                //! PRICE OPTIONS
                <ul
                  className={`m-0 p-0 ${expand[option.label] ? "h-fit pb-3" : "h-0 py-0"
                    } overflow-hidden transition-all duration-500`}
                >
                  {option.values.map(({ label, range }) => (
                    <li className="py-1" key={`${option.label} ${label}`}>
                      <span
                        onClick={() => handleFilterChange("price", range)}
                        className="w-fit flex gap-[1rem] items-center"
                      >
                        <span className="flex justify-center items-center w-[22px] h-[22px] border border-zinc-400 rounded">
                          <MdDone
                            className={`${filterData.price.length > 0
                                ? filterData.price.some(
                                  (priceRange) =>
                                    priceRange[0] === range[0] &&
                                    priceRange[1] === range[1]
                                )
                                  ? ""
                                  : "hidden"
                                : "hidden"
                              }`}
                          />
                        </span>
                        <span>{label}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                //! REGULAR OPTIONS
                <ul
                  className={`m-0 p-0 ${expand[option.label] ? "h-fit pb-3" : "h-0 py-0"
                    } overflow-hidden transition-all duration-500`}
                >
                  {option.values.map((value) => (
                    <li className="py-1" key={`${option.label} ${value}`}>
                      <span
                        onClick={() => handleFilterChange(option.label, value)}
                        className="w-fit flex gap-[1rem] items-center"
                      >
                        <span className="flex justify-center items-center w-[22px] h-[22px] border border-zinc-400 rounded">
                          <MdDone
                            className={`${filterData[option.label].includes(value)
                                ? ""
                                : "hidden"
                              }`}
                          />
                        </span>
                        <span>{value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        )}
      </section>
    )
  );
};

export default Filters;
