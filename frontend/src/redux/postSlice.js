import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.currentPost = action.payload;
    },
    like: (state, action) => {
      if (!state.currentPost.likes.includes(action.payload)) {
        state.currentPost.likes.push(action.payload);
      }
    },
    dislike: (state, action) => {
      if (state.currentPost.likes.includes(action.payload)) {
        state.currentPost.likes.splice(
          state.currentPost.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchSuccess, like, dislike } = postSlice.actions;

export default postSlice.reducer;