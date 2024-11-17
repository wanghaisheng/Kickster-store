import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Product from "../components/product/Product";
import AdminPanel from "../components/admin/AdminPanel";
import Dashboard from "../components/admin/Dashboard";
import AdminContent from "../components/admin/adminContents/AdminContent";
import AddProduct from "../components/admin/adminContents/AddProduct";
import UpdateProduct from "../components/admin/adminContents/UpdateProduct";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<Dashboard />}/>
        <Route path="/admin/:section" element={<AdminContent />} />
        <Route path="/admin/products/add product" element={<AddProduct />} />
        <Route path="/admin/products/update product/:id" element={<UpdateProduct />} />
      </Route>
    </Routes>
  );
};

export default Router;
