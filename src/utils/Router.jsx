import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Product from "../components/product/Product";
import AdminPanel from "../components/admin/AdminPanel";
import Dashboard from "../components/admin/Dashboard";
import AdminContent from "../components/admin/adminContents/AdminContent";
import AddUpdateProduct from "../components/admin/adminContents/products/AddUpdateProduct";
import User from "../components/user/User";
import Login from "../components/user/Login";
import UserAccount from "../components/user/UserAccount";
import { useSelector } from "react-redux";

const Router = () => {
  const user = useSelector(state => state.loggedInUser.user)
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/user" element={<User />}>
        <Route path="/user/:action" element={<Login />} />
        <Route path="/user/account" element ={<UserAccount/>}/>
      </Route>
      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/:section" element={<AdminContent />} />
        <Route path="/admin/products/add" element={<AddUpdateProduct />} />
        <Route path="/admin/products/update/:id" element={<AddUpdateProduct />} />
      </Route>
    </Routes>
  );
};

export default Router;
