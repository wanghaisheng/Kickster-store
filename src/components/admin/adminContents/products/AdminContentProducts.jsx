import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import {
  doc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore"
import { db } from "../../../../utils/firebaseConfigures";
import Loader from "../../../loader/Loader";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";



const AdminContentProducts = () => {

  const [products, setProducts] = useState(null);
  const [revealMenu, setRevealMenu] = useState(null);

  const exportToExcel = () => {
    // Prepare data for Excel
    const excelData = products.map(item => ({
      Title: item.title,
      Brand: item.brand,
      Stock: item.stock,
      Price: item.price,
      Discount: item.discount,
      Gender: item.gender,
      Rating: item.rating,
      Sales: item.sales,
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "products.xlsx");
  };

  const productsFetcher = async () => {
    try {
      const response = await getDocs(collection(db, "products"));
      setProducts(response.docs.map(doc => doc.data()))

    } catch (error) {
      toast.error("Error getting documents: ", error);
    }
  }
  useEffect(() => {
    productsFetcher();
  }, []);
  const productDeleter = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", `${productId}`));
      location.reload();
    }
  }

  return (
    !products ? <Loader /> :
      <>
        <div className="table-btns w-full flex justify-center gap-[24px] py-4">
          <Link to="/admin/products/add" className="flex-1 lg:min-w-[150px] lg:w-[10vw] flex justify-center items-center bg-zinc-800 text-white py-3 lg:py-2 rounded-md text-[0.9rem]">
            Add Product
          </Link>
          <button
            onClick={products && exportToExcel}
            className="lg:min-w-[150px] lg:w-[10vw] flex-1 flex justify-center items-center bg-white py-3 lg:py-2 rounded-md text-[0.9rem] border border-zinc-800"
          >
            Export as Excel
          </button>
        </div>
        <div className="table-headings hidden xl:grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr_1fr] place-items-center border-b border-b-zinc-400 py-1 text-[1.05rem]">
          <span className="col-heading"></span>
          <span className="col-heading txt-medium">Name</span>
          <span className="col-heading txt-medium">Brand</span>
          <span className="col-heading txt-medium">Stock</span>
          <span className="col-heading txt-medium">Price</span>
          <span className="col-heading txt-medium">Edit</span>
          <span className="col-heading txt-medium">Delete</span>
          <span className="col-heading txt-medium">View</span>
        </div>
        <div className="table-content-container w-full">
          {products.map((item) => (
            <div key={item.id} className="table-content-list w-full h-fit grid grid-cols-[1.1fr_4fr_0.5fr] xl:grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3 place-items-center py-2 border-b border-b-zinc-300 relative">
              <img className="h-[80px] w-full lg:w-fit lg:h-[100px]" src={item.images[0]} alt="" />
              <span>{item.title}</span>
              <span className="capitalize hidden xl:block">{item.brand}</span>
              <span className="hidden xl:block">{item.stock}</span>
              <span className="hidden xl:block">{item.price}</span>
              <Link to={`/admin/products/update/${item.id}`} className="hidden xl:flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded justify-items-center">
                <FiEdit2 />
              </Link>
              <span className="hidden xl:block">
                <span onClick={() => productDeleter(item.id)} className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded">
                  <MdOutlineDeleteOutline className="text-[1.1rem]" />
                </span>
              </span>
              <Link to={`/product/${item.id}`} className="hidden xl:flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded justify-items-center">
                <MdOutlineRemoveRedEye className="text-[1.1rem]" />
              </Link>


              <span onClick={() => setRevealMenu(prev => prev === item.id ? null : item.id)} className="block xl:hidden">
                <HiOutlineDotsVertical className="text-[1.2rem]" />
              </span>
              <div className={`action-menu min-w-40 absolute z-10 top-[10%] right-[10%] ${revealMenu === item.id ? "flex flex-col gap-2" : "hidden"} p-3 backdrop-blur-lg rounded-md bg-[#b1b1b127] shadow-xl shadow-[#00000028]`} >
                <span className="capitalize"><span className="txt-medium">Brand:</span> {item.brand}</span>
                <span><span className="txt-medium">Stock:</span> {item.stock}</span>
                <span><span className="txt-medium">Price:</span> {item.price}</span>
                <div className="edit-delete flex justify-between">
                  <Link to={`/admin/products/update/${item.id}`} className="flex w-[35px] h-[35px] justify-center items-center border-[1.2px] border-zinc-800 rounded justify-items-center">
                    <FiEdit2 />
                  </Link>
                  <span onClick={() => productDeleter(item.id)} className="flex w-[35px] h-[35px] justify-center items-center border-[1.2px] border-zinc-800 rounded">
                    <MdOutlineDeleteOutline className="text-[1.1rem]" />
                  </span>
                  <Link to={`/product/${item.id}`} className="flex w-[35px] h-[35px] justify-center items-center border-[1.2px] border-zinc-800 rounded justify-items-center">
                    <MdOutlineRemoveRedEye className="text-[1.1rem]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
  );
};

export default AdminContentProducts;
