import React from "react";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

const AdminContentProducts = () => {
  const { loading, data, error } = useSelector((state) => state.products);

  const exportToExcel = () => {
    // Prepare data for Excel
    const excelData = data.map(item => ({
      Title: item.title,
      Brand: item.brand,
      Stock: item.stock,
      Price: item.price,
      Category: item.category,
      Description: item.description,
      Rating: item.rating,
      Sales: item.sales
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "products.xlsx");
  };
  
  return (
    loading ? <div className="w-full h-[80vh] flex justify-center items-center"><img className="h-[80px]" src="../../../../../assets/images/loading.gif" alt="" /></div> :
    <>
      <div className="table-btns w-full flex justify-end gap-[24px] py-4">
        <Link to="/admin/products/add" className="min-w-[150px] w-[10vw] flex justify-center items-center bg-zinc-800 text-white py-2 rounded-md text-[0.9rem]">
          Add Product
        </Link>
        <button 
          onClick={exportToExcel}
          className="min-w-[150px] w-[10vw] flex justify-center items-center bg-white py-2 rounded-md text-[0.9rem] border border-zinc-800"
        >
          Export as Excel
        </button>
      </div>
      <div className="table-headings grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] place-items-center border-b border-b-zinc-400 py-1 font-semibold">
        <span className="col-heading"></span>
        <span className="col-heading">Name</span>
        <span className="col-heading">Brand</span>
        <span className="col-heading">Stock</span>
        <span className="col-heading">Price</span>
        <span className="col-heading">Edit</span>
        <span className="col-heading">Delete</span>
      </div>
      <div className="table-content-container w-full">
      {data.map((item) => (
        <div className="table-content-list grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] place-items-center py-2 border-b border-b-zinc-300">
          <img className="h-[80px]" src={item.images[0]} alt="" />
          <span>{item.title}</span>
          <span className="capitalize">{item.brand}</span>
          <span>{item.stock}</span>
          <span>{item.price}</span>
          <Link to={`/admin/products/update/${item.id}`} className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded justify-items-center">
            <FiEdit2 />
          </Link>
          <span>
            <span className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded">
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
