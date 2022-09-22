import isEmpty from "./is-empty";
import setAuthHeader from "./set-auth-header";

const checkAuthState = () => {
  let userInfo = localStorage.getItem("ALGOMED_USER");

  if (!isEmpty(userInfo)) {
    userInfo = JSON.parse(userInfo);
    console.log(userInfo);
    setAuthHeader(userInfo.token);

    return { isAuthSet: true, ...userInfo };
  } else {
    return {
      isAuthSet: true,
    };
  }
};

export default checkAuthState;
