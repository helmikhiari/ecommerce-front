import { createSlice } from "@reduxjs/toolkit"

const initialState =
{
    wishList: []
}

const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    reducers: {
        setWishList: (state, action) => {
            state.wishList = [...action.payload];
        },
        toggleFavourite: (state, action) => {
            const index = state.wishList.indexOf(action.payload);
            if (index >= 0) {
                state.wishList.splice(index, 1);
            }
            else {
                state.wishList.push(action.payload);
            }
        }
    }
})

export const { setWishList, toggleFavourite } = wishListSlice.actions;
export default wishListSlice.reducer;