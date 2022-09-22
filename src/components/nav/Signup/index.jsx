import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import isEmpty from "../../../utils/is-empty";
import clsx from "clsx";

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
  acceptTerms: false,
  Profession: "",
  Specialty: "",
  // Organization: "",
  // Address: "",
  EHR: "",
  country: "",
  state: "",
  Address: "30210 bev hills",
  Organization: "Sutter Health",
};

const Signup = ({ toggleModals, closeModal }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (address) => {
    setFormState((prevState) => {
      return { ...prevState, Address: address };
    });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

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

    axios
      .post("/accounts/register", formState)
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    // axios.get("/accounts/countries").then((res) => {
    //   console.log(res.data);
    // });
  }, []);

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
                name="title"
                onChange={inputChangeHandler}
                value={formState.title}
              >
                <option value="">Select an option</option>
                <option value="Dr">Dr.</option>
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Miss">Miss</option>
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
                name="firstName"
                onChange={inputChangeHandler}
                value={formState.firstName}
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
                name="lastName"
                onChange={inputChangeHandler}
                value={formState.lastName}
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
              name="email"
              onChange={inputChangeHandler}
              value={formState.email}
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
                type="password"
                placeholder="******************"
                name="confirmPassword"
                onChange={inputChangeHandler}
                value={formState.confirmPassword}
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
              name="title"
              onChange={inputChangeHandler}
              value={formState.country}
            >
              <option value="">Select an option</option>
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
              name="state"
              onChange={inputChangeHandler}
              value={formState.state}
            >
              <option value="">Select an option</option>
              <option value="options-1">Option 1</option>
              <option value="options-2">Option 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="profession"
            >
              Profession
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="profession"
              type="text"
              name="Profession"
              placeholder="Profession"
              onChange={inputChangeHandler}
              value={formState.Profession}
            >
              <option value="">Select an option</option>
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
          {formState.Profession === "physician" && (
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
                name="Specialty"
                onChange={inputChangeHandler}
                value={formState.Specialty}
              >
                <option value="">Select an option</option>
                <option value="options-1">Option 1</option>
                <option value="options-2">Option 2</option>
              </select>
            </div>
          )}
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="EHR"
            >
              Primary EHR Vendor
            </label>
            <select
              className="shadow h-[38px] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="EHR"
              type="text"
              name="EHR"
              placeholder="Primary Vendor"
              value={formState.EHR}
              onChange={inputChangeHandler}
            >
              <option value="">Select an option</option>
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

          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="ehr"
            >
              Map
            </label>
            <PlacesAutocomplete
              value={formState.Address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="relative">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                    })}
                  />
                  <div className="absolute left-0 right-0 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {loading && (
                      <div className="text-gray-700 block px-4 py-2 text-sm">
                        Loading...
                      </div>
                    )}
                    {suggestions.map((suggestion) => {
                      const className = clsx(
                        "text-gray-700 block px-4 py-2 text-sm",
                        suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item"
                      );
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

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
