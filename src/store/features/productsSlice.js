import { createSlice } from "@reduxjs/toolkit";

import app from "../../utils/firebaseConfigures";
import {
    getFirestore,
    collection,
    getDocs,

} from "firebase/firestore"

const db = getFirestore(app);
const colRef = collection(db, "data");

let initialState = {
    productItems : []
};

const getData = async () => {
    const docSnap = await getDocs(colRef)
    let data = [];
    docSnap.forEach(doc => {
        data = [...data, doc.data()]
    })
    console.log(data);
    
    return data;
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        fetchData : (state) => {
            state.productItems = getData();
        }
    }
})

export const { fetchData } = productSlice.actions;
export default productSlice.reducer;