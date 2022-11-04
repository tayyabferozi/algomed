import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../../utils/get-cookie";
import setAuthHeader from "../../utils/set-auth-header";

let timer;

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
      localStorage.setItem("ALGOMED_USER", JSON.stringify(action.payload));
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
  try {
    // console.log("CHECKING STATE...");
    let token = localStorage.getItem("ALGOMED_USER");

    if (token) {
      token = JSON.parse(token).token;
    }

    const res = await fetch("/accounts/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=none",
      },
    });

    const data = await res.json();

    // const { data } = await axios.post(
    //   "/accounts/refresh-token",
    //   {},
    //   {
    //     withCredentials: true,
    //     // headers: {
    //     //   Authorization: "Bearer " + token,
    //     // },
    //   }
    // );

    if (res.ok) {
      dispatch(login({ ...data, token: data.jwtToken, isAuthSet: true }));
      setAuthHeader(data.jwtToken);
    } else {
      console.log(data.message);
      // dispatch(login({ isAuthSet: true }));
      dispatch(logout());
    }
  } catch (err) {
    console.log(err);
    dispatch(logout());
  }

  // setAuthHeader(userInfo.token);

  // return { isAuthSet: true, ...userInfo };
};
// export const checkAuthState = () => async (dispatch, getState) => {
//   try {
//     const res = await fetch("/accounts/refresh-token", {
//       method: "POST",
//       credentials: "include",
//       headers: {},
//     });

//     const data = await res.json();
//     if (res.ok) {
//       dispatch(login({ ...data, token: data.jwtToken, isAuthSet: true }));
//       setAuthHeader(data.jwtToken);
//     } else {
//       console.log(data.message);
//       dispatch(login({ isAuthSet: true }));
//     }
//   } catch (err) {
//     console.log(err);
//     dispatch(logout());
//   }

//   // setAuthHeader(userInfo.token);

//   // return { isAuthSet: true, ...userInfo };
// };

// function startRefreshTimer() {
//   setInterval(async function () {
//     try {
//       const { data } = await axios.post("/accounts/refresh-token", {}, {withCredentials: true});
//       // const res = await fetch("/accounts/refresh-token", {
//       //   method: "POST",
//       //   credentials: "include",
//       // });

//       // const data = await res.json();
//       if (res.ok) {
//         data.token = data.jwtToken;
//         axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
//         localStorage.setItem("ALGOMED_USER", data);
//         setAuthHeader(data.token);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//     // }, 1000 * 60 * 60 * 15);
//   }, 1000);
// }
function startRefreshTimer() {
  if (timer) {
    return;
  }
  timer = setInterval(async function () {
    try {
      const res = await fetch("/accounts/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "SameSite=none",
        },
      });

      const data = await res.json();
      if (res.ok) {
        data.token = data.jwtToken;
        axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
        localStorage.setItem("ALGOMED_USER", JSON.stringify(data));
        setAuthHeader(data.token);
      }
    } catch (err) {
      console.log(err);
    }
  }, 1000 * 60 * 60 * 15);
  // }, 1000);
}

export const revokeTokenAndLogout =
  ({ cb }) =>
  async (dispatch) => {
    const token = getCookie("refreshToken");

    try {
      await axios.post("/accounts/revoke-token", { token });

      dispatch(logout());
      cb();

      // const res = await fetch("/accounts/revoke-token", {
      //   method: "POST",
      //   credentials: "include",
      //   body: JSON.stringify({
      //     token: token,
      //   }),
      // });

      // const data = await res.json();

      // if (res.ok) {
      //   console.log(res);
      //   dispatch(logout());
      // }
    } catch (err) {
      console.log(err);
    }
  };
