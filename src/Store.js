import { configureStore } from "@reduxjs/toolkit";
import clockSlice from "./features/clockSlice/clockSlice";

export const Store = configureStore({
  reducer: {
    clock: clockSlice,
  }
})