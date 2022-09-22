import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  title: null,
  firstName: null,
  lastName: null,
  email: null,
  address: null,
  created: null,
  ehr: null,
  isVerified: null,
  organization: null,
  profession: null,
  role: null,
  specialty: null,
  isAuthSet: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("ALGOMED_USER");
      state.token = null;
      state.id = null;
      state.title = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.address = null;
      state.created = null;
      state.ehr = null;
      state.isVerified = null;
      state.organization = null;
      state.profession = null;
      state.role = null;
      state.specialty = null;
    },
  },
});

const reducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default reducer;
