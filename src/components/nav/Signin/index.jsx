import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../../store/slices/authSlice";

const Signin = ({ toggleModals, closeModal }) => {
  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    closeModal();

    dispatch(login());
    navigate("/diagnosis");
  };

  return (
    <div className="w-full max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 max-h-[90vh] overflow-y-auto">
      <div className="bg-slate-100 rounded-t font-bold text-xl px-8 py-4">
        <div className="text-700">Sign In</div>
      </div>
      <form
        onSubmit={formSubmitHandler}
        className="bg-white shadow-md rounded-b px-8 pt-6 pb-8"
      >
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder=""
          />
        </div>
        <div className="mb-3">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow  border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#0"
            onClick={toggleModals}
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
