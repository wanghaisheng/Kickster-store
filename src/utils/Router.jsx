import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import Product from "../components/product/Product";
import AdminPanel from "../components/admin/AdminPanel";
import Dashboard from "../components/admin/Dashboard";
import AdminContent from "../components/admin/adminContents/AdminContent";
import AddUpdateProduct from "../components/admin/adminContents/products/AddUpdateProduct";
import Login from "../components/user/Login";
import UserAccount from "../components/user/UserAccount";
import { useSelector } from "react-redux";
import SignUp from "../components/user/SignUp";
import User from "../components/user/User";

const Router = () => {
  const user = useSelector(state => state.loggedInUser.user);
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/login" element={user ? user.role === "admin" ? <Navigate to="/admin"/> : <Navigate to="/user"/> : <Login />} />
      <Route path="/signup" element={user ? user.role === "admin" ? <Navigate to="/admin"/> : <Navigate to="/user"/> : <SignUp />} />
      <Route path="/user" element={<User />}>
        <Route index element={<UserAccount />} />
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
