import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import isEmpty from "../../../utils/is-empty";
import RegisterForm from "../RegisterForm";

// const initialFormState = {
//   title: "Mr",
//   firstName: "John",
//   lastName: "Doe",
//   email: "ferozitayyab@gmail.com",
//   password: "123456",
//   confirmPassword: "123456",
//   acceptTerms: true,
//   Profession: "Physician",
//   Specialty: "Pediatrics",
//   Organization: "Sutter Health",
//   Address: "30210 bev hills",
//   EHR: "Epic",
// };
const initialFormState = {
  title: "Mr",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: true,
  Profession: "",
  Specialty: "",
  EHR: "Epic",
  EHRText: "",
  country: "",
  state: "",
  Address: "",
  Organization: "",
};

const Signup = ({ toggleModals, closeModal }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const inputChangeHandler = (e) => {
    let { type, name, value } = e.target;

    if (type === "checkbox") {
      if (value === "on") {
        value = true;
      } else {
        value = false;
      }
    }

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
    // setFormState((prevState) => ({ ...prevState, acceptTerms: true }));

    let EHR = "";

    if (formState.EHR === "other") {
      EHR = formState.EHRText;
    } else {
      EHR = formState.EHR;
    }

    axios
      .post("/accounts/register", { ...formState, EHR, acceptTerms: true })
      .then((res) => {
        closeModal();
        toast.success(
          "Algomed is in closed Beta. Your request has been received. We typically respond within 24 hours. Please check your email inbox and spam folder for an invitation to login."
        );
      })
      .catch((err) => {
        console.log(err);
        if (!isEmpty(err.response.data?.errors)) {
          for (const key in err.response.data?.errors) {
            if (Object.hasOwnProperty.call(err.response.data?.errors, key)) {
              let element = err.response.data?.errors[key];

              if (typeof element === "object") {
                element = element[0];
              }

              toast.error(element);
            }
          }
        } else if (!isEmpty(err.response.data?.message)) {
          toast.error(err.response.data?.message);
        } else {
          toast.error("Uh Oh! Something went wrong!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-100 rounded-t font-bold text-xl px-8 py-4">
          <div className="text-700">Request Access to Algomed</div>
        </div>
        <form
          onSubmit={formSubmitHandler}
          className="bg-white shadow-md rounded-b px-8 pt-6 pb-8"
        >
          <RegisterForm
            formState={formState}
            inputChangeHandler={inputChangeHandler}
          />
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              value={true}
              readOnly
              onClick={() => false}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label className="text-sm" htmlFor="terms">
              Accept Terms &amp; Conditions
            </label>
          </div>
          <div className="flex items-center gap-8 mt-6">
            <button
              disabled={isLoading}
              className="disabled:opacity-50 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#0"
              onClick={toggleModals}
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
