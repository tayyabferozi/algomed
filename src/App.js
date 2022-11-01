import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";

import "./styles/styles.scss";

import { Nav } from "./components/nav/Nav";
import { Sidebar } from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Products from "./pages/Products";
import Company from "./pages/Company";
import { useEffect } from "react";
import { checkAuthState } from "./store/slices/authSlice";

function App() {
  const { isAuthSet, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  axios.defaults.baseURL = "http://20.169.80.243/algomed";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (isAuthSet)
    return (
      <>
        <CookiesProvider>
          <ToastContainer />
          <Router>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route exact index element={<About />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/company" element={<Company />} />
                {token && (
                  <>
                    <Route exact path="/diagnosis" element={<Sidebar />} />
                  </>
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </Router>
        </CookiesProvider>
      </>
    );
  else
    return (
      <div className="full-page-loader">
        <div className="loader" />
      </div>
    );
}

export default App;
