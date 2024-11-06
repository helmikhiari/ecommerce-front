import { configureStore } from "@reduxjs/toolkit";
import userSlice from './../reducers/userSlice';
import productsSlice from './../reducers/productSlice'
import cartSlice from './../reducers/cartSlice'
import wishListSlice from './../reducers/wishListSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        cart: cartSlice,
        wishList: wishListSlice
    }
})

export default store;