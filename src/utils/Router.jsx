import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../components/homepage/Homepage'
import Product from '../components/product/Product'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/product/:id' element={<Product />}/>
        </Routes>
    )
}

export default Router