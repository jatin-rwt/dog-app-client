import { configureStore } from "@reduxjs/toolkit";
import blogSlices from "./slices/blogSlices";

const store = configureStore({
  reducer: {
    blogSlices: blogSlices, // add reducers here
  },
});

export default store;
