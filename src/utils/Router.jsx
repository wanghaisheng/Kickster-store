import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Product from "../components/product/Product";
import AdminPanel from "../components/admin/AdminPanel";
import Dashboard from "../components/admin/Dashboard";
import AdminContent from "../components/admin/adminContents/AdminContent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<Dashboard />}/>
        <Route path="/admin/:section" element={<AdminContent />} />
      </Route>
    </Routes>
  );
};

export default Router;
