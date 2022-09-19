import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import "./App.css";
import "./styles/styles.scss";

import { Nav } from "./components/nav/Nav";
import { Sidebar } from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Products from "./pages/Products";
import Company from "./pages/Company";
import Diagnosis from "./pages/Diagnosis";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
