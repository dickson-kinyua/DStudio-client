import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !state.isauthenticated;
    },
    InvalidateUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !state.isauthenticated;
    },
  },
});

export const { updateUser,InvalidateUser } = userSlice.actions;

export default userSlice.reducer;
