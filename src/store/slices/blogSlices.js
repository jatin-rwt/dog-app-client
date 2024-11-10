import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: { blogs: [] },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    resetBlogs: (state) => {
      state.blogs = [];
    },
  },
});

export const { resetBlogs, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
