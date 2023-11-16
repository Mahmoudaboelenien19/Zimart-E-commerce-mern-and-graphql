import { Blog } from "@/types/blog";
import { createSlice } from "@reduxjs/toolkit";

interface sliceStateInterface {
  blogs: Blog[];
}
const initialState: sliceStateInterface = {
  blogs: [],
};

const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addToBlogsRedux(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { addToBlogsRedux } = BlogsSlice.actions;
export default BlogsSlice.reducer;
