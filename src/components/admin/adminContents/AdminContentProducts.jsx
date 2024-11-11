import React from "react";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const AdminContentProducts = () => {
  const { loading, data, error } = useSelector((state) => state.products);

  //   return (
  //     <table className='admin-products-table w-full text-center'>
  //         <tr className='border-b border-b-zinc-300'>
  //             <th></th>
  //             <th>Name</th>
  //             <th>Stock</th>
  //             <th>Price</th>
  //             <th>Edit</th>
  //             <th>Delete</th>
  //         </tr>
  //         {
  //             data.map(item => (
  //                 <tr className='border-b border-b-zinc-300' key={item.id}>
  //                     <td><img className='h-[80px]' src={item.images[0]} alt={item.name} /></td>
  //                     <td>{item.title}</td>
  //                     <td>{item.stock}</td>
  //                     <td>{item.price}</td>
  //                     <td><span className='w-[30px] h-[30px] flex justify-center items-center rounded border border-zinc-300'><FiEdit2 /></span></td>
  //                     <td><span className='w-[30px] h-[30px] flex justify-center items-center rounded border border-zinc-300'><MdOutlineDeleteOutline /></span></td>
  //                 </tr>
  //             ))
  //         }
  //     </table>
  //   )

  return (
    <>
    <div className="table-btns w-full flex justify-end gap-[24px] py-4">
        <button className="min-w-[150px] w-[10vw] bg-blue-700 text-white py-2 rounded-md text-[0.9rem]">Add Product</button>
        <button className="min-w-[150px] w-[10vw] bg-white py-2 rounded-md text-[0.9rem] border border-zinc-800">Export as Excel</button>
    </div>
      <div className="table-headings grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] place-items-center border-b border-b-zinc-400 py-1 font-semibold">
        <span className="col-heading"></span>
        <span className="col-heading">Name</span>
        <span className="col-heading">Stock</span>
        <span className="col-heading">Price</span>
        <span className="col-heading">Edit</span>
        <span className="col-heading">Delete</span>
      </div>
      {data.map((item) => (
        <div className="table-content grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] place-items-center mt-2">
          <img className="h-[80px]" src={item.images[0]} alt="" />
          <span>{item.title}</span>
          <span>{item.stock}</span>
          <span>{item.price}</span>
          <span className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded justify-items-center">
            <FiEdit2 />
          </span>
          <span>
            <span className="flex w-[30px] h-[30px] justify-center items-center border border-zinc-300 rounded">
              <MdOutlineDeleteOutline className="text-[1.1rem]" />
            </span>
          </span>
        </div>
      ))}
    </>
  );
};

export default AdminContentProducts;
