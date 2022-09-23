import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/styles.scss";

import { Nav } from "./components/nav/Nav";
import { Sidebar } from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Products from "./pages/Products";
import Company from "./pages/Company";
import Diagnosis from "./pages/Diagnosis";
import axios from "axios";
import { useEffect } from "react";
import checkAuthState from "./utils/check-auth-state";
import { login } from "./store/slices/authSlice";

function App() {
  const { isAuthSet } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  axios.defaults.baseURL = "http://20.169.80.243/algomed";

  useEffect(() => {
    dispatch(login(checkAuthState()));
  }, [dispatch]);

  if (isAuthSet)
    return (
      <>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Nav />}>
              <Route exact index element={<Sidebar />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/company" element={<Company />} />
              <Route exact path="/diagnosis" element={<Diagnosis />} />
            </Route>
          </Routes>
        </Router>
      </>
    );
}

export default App;
