const { createSlice } = require("@reduxjs/toolkit");



const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    isAuthenticated: null,
}
const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setData: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName
            state.email = action.payload.email;
        }
        ,
        logOut: (state) => {
            state.isAuthenticated = false;
            state.firstName = null;
            state.lastName = null
            state.email = null;
            localStorage.removeItem('token');
        }
    }

})

export const { setIsAuth, setData, logOut } = userSlice.actions;

export default userSlice.reducer




