import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import todoReducer from "./todoSlice";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todo: todoReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;