import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlices";

const store = configureStore({
  reducer: {
    blogSlice: blogSlice, // add reducers here
  },
});

export default store;
