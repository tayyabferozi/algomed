import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../../store/slices/authSlice";
import isEmpty from "../../../utils/is-empty";

const initialFormState = {
  email: "",
  password: "",
};

const Signin = ({ toggleModals, closeModal }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    fetch("/accounts/authenticate", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=none",
      },
      body: JSON.stringify(formState),
    })
      .then(async (res) => {
        if (res.ok) {
          setIsLoading(false);

          return res.json();
        } else {
          const data = await res.json();

          if (data) {
            if (!isEmpty(data?.errors)) {
              for (const key in data?.errors) {
                if (Object.hasOwnProperty.call(data?.errors, key)) {
                  let element = data?.errors[key];

                  if (typeof element === "object") {
                    element = element[0];
                  }

                  toast.error(element);
                }
              }
            } else if (!isEmpty(data?.message)) {
              toast.error(data?.message);
            } else {
              toast.error("Uh Oh! Something went wrong!");
            }
          }
        }
        setIsLoading(false);
      })
      .then((data) => {
        data.token = data.jwtToken;
        dispatch(login(data));
        navigate("/diagnosis");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .post("/accounts/authenticate", formState, { withCredentials: true })
    //   .then((res) => {
    //     res.data.token = res.data.jwtToken;
    //     setAuthHeader(res.data.token);
    //     localStorage.setItem("ALGOMED_USER", JSON.stringify(res.data));

    //     dispatch(login(res.data));
    //     navigate("/diagnosis");
    //     closeModal();
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //     if (err.response.data) {
    //       if (!isEmpty(err.response.data?.errors)) {
    //         for (const key in err.response.data?.errors) {
    //           if (Object.hasOwnProperty.call(err.response.data?.errors, key)) {
    //             let element = err.response.data?.errors[key];

    //             if (typeof element === "object") {
    //               element = element[0];
    //             }

    //             toast.error(element);
    //           }
    //         }
    //       } else if (!isEmpty(err.response.data?.message)) {
    //         toast.error(err.response.data?.message);
    //       } else {
    //         toast.error("Uh Oh! Something went wrong!");
    //       }
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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
            name="email"
            value={formState.email}
            onChange={inputChangeHandler}
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
              placeholder="*********"
              name="password"
              value={formState.password}
              onChange={inputChangeHandler}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:pointer-events-none"
          >
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
