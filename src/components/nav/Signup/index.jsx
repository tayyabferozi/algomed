import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = ({ toggleModals, closeModal }) => {
  const [formState, setFormState] = useState({
    role: "physician",
  });

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

    toast.success(
      "Algomed is in closed Beta. Your request has been received. We typically respond within 24 hours. Please check your email inbox and spam folder for an invitation to login."
    );
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
          <div className="mb-3 grid grid-cols-3 gap-3">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="title"
              >
                Title
              </label>
              <select
                className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="title"
              >
                <option value="dr">Dr.</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="miss">Miss</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first-name"
                type="text"
                placeholder=""
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="last-name"
                type="text"
                placeholder=""
              />
            </div>
          </div>
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
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="country"
            >
              Country
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              placeholder="country"
            >
              <option value="options-1">Option 1</option>
              <option value="options-2">Option 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="state"
            >
              State
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              placeholder="state"
            >
              <option value="options-1">Option 1</option>
              <option value="options-2">Option 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              type="text"
              name="role"
              placeholder="Role"
              onChange={inputChangeHandler}
              value={formState.role}
            >
              <option value="physician">Physician</option>
              <option value="nurse-practioner">Nurse Practioner</option>
              <option value="registered-nurse">Registered Nurse</option>
              <option value="health-informatics-engineer">
                Health Informatics Engineer
              </option>
              <option value="appointment-schedular">
                Appointment Schedular
              </option>
              <option value="health-executive">Health Executive</option>
            </select>
          </div>
          {formState.role === "physician" && (
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="state"
              >
                Speciality
              </label>
              <select
                className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                placeholder="state"
              >
                <option value="options-1">Option 1</option>
                <option value="options-2">Option 2</option>
              </select>
            </div>
          )}
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="primary-vendor"
            >
              Primary EHR Vendor
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="primary-vendor"
              type="text"
              name="primary-vendor"
              placeholder="Primary Vendor"
              value={formState["primary-vendor"]}
              onChange={inputChangeHandler}
            >
              <option value="epic">Epic</option>
              <option value="cerner">Cerner</option>
              <option value="meditech">Meditech</option>
              <option value="cpsi">CPSI</option>
              <option value="all-scripts">Allscripts</option>
              <option value="athenahealth">Athenahealth</option>
              <option value="other">None/other</option>
            </select>
          </div>
          {formState["primary-vendor"] === "other" && (
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="ehr"
              >
                Specify EHR
              </label>
              <textarea
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ehr"
                name="ehr"
                type="text"
                placeholder=""
              />
            </div>
          )}
          <div className="flex items-center gap-8 mt-6">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
