import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComment: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchSuc: (state, action) => {
      state.currentComment = action.payload;
    },
    createCommment: (state, action) => {
      if (state.currentComment.every(comment => 
        comment._id !== action.payload._id
      )) {
        state.currentComment.push(action.payload);
      }
    },
    deleteComment: (state, action) => {
      if (state.currentComment.some((comment) => (
            comment._id === action.payload
        ))) {
        state.currentComment.splice(
          state.currentComment.findIndex(
            (commentId) => commentId === action.payload
          ),
          1
        );
      } 
    },
}});

export const { fetchSuc, createCommment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;