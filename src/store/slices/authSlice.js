import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = "some-token";
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
});

const reducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default reducer;
