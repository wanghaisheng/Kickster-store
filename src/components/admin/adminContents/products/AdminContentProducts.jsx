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

const AdminContentProducts = () => {

  const [ products, setProducts ] = useState(null)

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
      setProducts(response.docs.map( doc => doc.data()))
      
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
        <div className="table-headings grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] place-items-center border-b border-b-zinc-400 py-1 text-[1.05rem]">
          <span className="col-heading"></span>
          <span className="col-heading txt-medium">Name</span>
          <span className="col-heading txt-medium">Brand</span>
          <span className="col-heading txt-medium">Stock</span>
          <span className="col-heading txt-medium">Price</span>
          <span className="col-heading txt-medium">Edit</span>
          <span className="col-heading txt-medium">Delete</span>
        </div>
        <div className="table-content-container w-full">
          {products.map((item) => (
            <div key={item.id} className="table-content-list grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] place-items-center py-2 border-b border-b-zinc-300">
              <img className="h-[80px]" src={item.images[0]} alt="" />
              <span>{item.title}</span>
              <span className="capitalize">{item.brand}</span>
              <span>{item.stock}</span>
              <span>{item.price}</span>
              <Link to={`/admin/products/update/${item.id}`} className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded justify-items-center">
                <FiEdit2 />
              </Link>
              <span>
                <span onClick={() => productDeleter(item.id)} className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded">
                  <MdOutlineDeleteOutline className="text-[1.1rem]" />
                </span>
              </span>
            </div>
          ))}
        </div>
      </>
  );
};

export default AdminContentProducts;
