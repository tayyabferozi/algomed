import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

import Confirm from "../../Confirm";
import RegisterForm from "../RegisterForm";
import isEmpty from "../../../utils/is-empty";
import { useEffect } from "react";

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
  Profession: "",
  Specialty: "",
  EHR: "",
  EHRText: "",
  country: "",
  state: "",
  Address: "",
  Organization: "",
};

const ManageProfile = ({ toggleModals, closeModal }) => {
  const { auth } = useSelector((state) => state);

  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const onConfirm = () => {
    onCancel();
    closeModal();
  };

  const onCancel = () => {
    setShowConfirmModal(false);
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
      .put(`/accounts/${auth.id}`, { ...formState, EHR })
      .then((res) => {
        closeModal();
        toast.success("Info updated successfully, log in again to see changes");
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

  useEffect(() => {
    const accountInfo = { ...auth };
    delete accountInfo.token;
    delete accountInfo.jwtToken;
    delete accountInfo.isVerified;
    delete accountInfo.created;
    delete accountInfo.isAuthSet;
    delete accountInfo.id;
    accountInfo.Address = accountInfo.address;
    delete accountInfo.address;
    accountInfo.Profession = accountInfo.profession;
    delete accountInfo.profession;
    accountInfo.Specialty = accountInfo.specialty;
    delete accountInfo.specialty;
    accountInfo.EHR = accountInfo.ehr;
    delete accountInfo.ehr;

    setFormState(accountInfo);
    console.log(accountInfo);
  }, [auth]);

  return (
    <>
      {showConfirmModal && (
        <Confirm onConfirm={onConfirm} onCancel={onCancel} />
      )}
      <div className="w-full max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-100 rounded-t font-bold text-xl px-8 py-4">
          <div className="text-700">Update Profile</div>
        </div>
        <form
          onSubmit={formSubmitHandler}
          className="bg-white shadow-md rounded-b px-8 pt-6 pb-8"
        >
          <RegisterForm
            formState={formState}
            inputChangeHandler={inputChangeHandler}
            edit
          />

          <>
            <div className="mt-7 mb-5">
              <h2 className="font-bold text-xl">Change Password</h2>
              <p className="mt-1">Leave blank to keep the same</p>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  name="password"
                  onChange={inputChangeHandler}
                  value={formState.password}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-1"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="confirm-password"
                  placeholder="******************"
                  name="confirmPassword"
                  onChange={inputChangeHandler}
                  value={formState.confirmPassword}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <button
                disabled={isLoading}
                onClick={formSubmitHandler}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:pointer-events-none"
              >
                Update
              </button>
              {/* <button
                type="button"
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setShowConfirmModal(true);
                }}
              >
                Delete
              </button> */}
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pl-3"
                href="#0"
                onClick={(e) => {
                  closeModal();
                  e.preventDefault();
                }}
              >
                Cancel
              </a>
            </div>
          </>
        </form>
      </div>
    </>
  );
};

export default ManageProfile;
