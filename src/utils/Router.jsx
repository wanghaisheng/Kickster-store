import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Product from "../components/product/Product";
import AdminPanel from "../components/admin/AdminPanel";
import Dashboard from "../components/admin/Dashboard";
import AdminContent from "../components/admin/adminContents/AdminContent";
import AddUpdateProduct from "../components/admin/adminContents/products/AddUpdateProduct";
import Login from "../components/login/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/user/:action" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<Dashboard />}/>
        <Route path="/admin/:section" element={<AdminContent />} />
        <Route path="/admin/products/add" element={<AddUpdateProduct />} />
        <Route path="/admin/products/update/:id" element={<AddUpdateProduct />} />
      </Route>
    </Routes>
  );
};

export default Router;
