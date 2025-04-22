import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addTask: null
}

export const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            state.addTask = action.payload
        },
        deleteTask: (state, action) => {
            state.addTask = null
        }
    }
})

export const { addTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;