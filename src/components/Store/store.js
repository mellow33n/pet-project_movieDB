import { configureStore } from "@reduxjs/toolkit";
import { middlewares } from "./middlewares";
import  moviesDBSlice  from "./Reducers/moviesSlice";

export const store = configureStore({
  reducer: moviesDBSlice,
  middleware: [...middlewares],
});
