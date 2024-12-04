import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: "filters",
    initialState: {
        filterData: {
            gender: [],
            size: [],
            price: [],
            brand: [],
            sport: [],
            sneaker: false
        },
        
        filteredProducts : [],
    },
    reducers: {
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        }
    }
})

export const { setFilterData, setFilteredProducts } = filterSlice.actions;
export default filterSlice.reducer;