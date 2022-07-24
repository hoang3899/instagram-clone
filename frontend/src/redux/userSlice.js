import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    follow: (state, action) => {
      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.following.push(action.payload);
      }
    },
  },
});

export const { loginSuccess, logout, follow } = userSlice.actions;

export default userSlice.reducer;