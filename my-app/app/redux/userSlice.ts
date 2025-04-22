import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    password: "",
    userType: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.userType = action.payload.userType
            
        }
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
