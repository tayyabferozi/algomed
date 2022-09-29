import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import isEmpty from "../../utils/is-empty";
import setAuthHeader from "../../utils/set-auth-header";

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
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload.token;

      startRefreshTimer();

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
      state.isAuthSet = true;
    },
  },
});

const reducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default reducer;

export const checkAuthState = () => async (dispatch, getState) => {
  let userInfo = localStorage.getItem("ALGOMED_USER");

  if (!isEmpty(userInfo)) {
    try {
      const res = await fetch(
        "http://20.169.80.243/algomed/accounts/refresh-token",
        {
          method: "POST",
          credentials: "include",
          headers: {},
        }
      );

      const data = await res.json();
      if (res.ok) {
        dispatch(login(data));
      } else {
        console.log(data.message);
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
      userInfo = JSON.parse(userInfo);
      dispatch(logout());
    }

    // setAuthHeader(userInfo.token);

    // return { isAuthSet: true, ...userInfo };
  } else {
    dispatch(
      login({
        isAuthSet: true,
      })
    );
  }
};

function startRefreshTimer() {
  setTimeout(async function () {
    try {
      const { data } = await fetch(
        "http://20.169.80.243/algomed/accounts/refresh-token",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {},
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
    // }, 1000 * 60 * 15);
  }, 1000);
}
