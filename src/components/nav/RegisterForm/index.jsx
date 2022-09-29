import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PlacesAutocomplete from "react-places-autocomplete";
import clsx from "clsx";

const ehrList = [
  "",
  "Epic",
  "Cerner",
  "Meditech",
  "CPSI",
  "Allscripts",
  "Medhost",
  "Athenahealth",
];

const RegisterForm = ({ edit, inputChangeHandler, formState }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  // GET SURGEON SPECIALITIES

  useEffect(() => {
    setSpecialties([]);
    axios
      .get(`/accounts/MedicalSpecialties`)
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Uh Oh! Something went wrong while fetching the specialties list"
        );
      });
  }, []);

  // GET STATES

  useEffect(() => {
    setStates([]);
    if (formState.country)
      axios
        .get(`/accounts/getstate?countryCode=${formState.country}`)
        .then((res) => {
          let dataRaw = res.data;

          const altData = dataRaw.map((el, idx) => {
            return { label: el.StateName, val: el.StateCode };
          });

          setStates(altData);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "Uh Oh! Something went wrong while fetching the states list"
          );
        });
  }, [formState.country]);

  // GET COUNTRIES

  useEffect(() => {
    axios
      .get("/accounts/countries")
      .then((res) => {
        let dataRaw = res.data;

        const altData = dataRaw.map((el, idx) => {
          return { label: el.Country, val: el.Code };
        });

        setCountries(altData);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Uh Oh! Something went wrong while fetching the countries list"
        );
      });
  }, []);
  return (
    <>
      <div className="mb-3 grid grid-cols-3 gap-3">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <select
            className="shadow h-[38px] border rounded w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="title"
            name="title"
            onChange={inputChangeHandler}
            value={formState.title || ""}
          >
            <option value="">Select an option</option>
            <option value="Proff">Proff.</option>
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
            value={formState.firstName || ""}
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
            value={formState.lastName || ""}
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
          value={formState.email || ""}
        />
      </div>
      {!edit && (
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
              value={formState.password || ""}
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
              value={formState.confirmPassword || ""}
            />
          </div>
        </div>
      )}
      <div className="mb-3">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="country"
        >
          Country
        </label>
        <select
          className="shadow h-[38px] border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="country"
          type="text"
          placeholder="country"
          name="country"
          onChange={inputChangeHandler}
          value={formState.country || ""}
        >
          <option value="">Choose a country</option>
          {countries.map((el, idx) => {
            return (
              <option key={"country" + idx} value={el.val}>
                {el.label}
              </option>
            );
          })}
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
          className="shadow h-[38px] border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="state"
          type="text"
          placeholder="state"
          name="state"
          onChange={inputChangeHandler}
          value={formState.state || ""}
        >
          <option value="">Choose a state</option>
          {states.length === 0 ? (
            formState.country ? (
              <option>Loading...</option>
            ) : (
              <option disabled>Choose a country to see states...</option>
            )
          ) : (
            ""
          )}
          {states.map((el, idx) => {
            return (
              <option key={"state" + idx} value={el.val}>
                {el.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-3">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="organization"
        >
          Main Healthcare Organization Affiliation
        </label>
        <input
          className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="organization"
          type="text"
          placeholder=""
          name="Organization"
          onChange={inputChangeHandler}
          value={formState.Organization || ""}
        />
      </div>

      <div className="mb-3">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="ehr"
        >
          Main Practice Address
        </label>
        <PlacesAutocomplete
          value={formState.Address || ""}
          onChange={(val) => {
            inputChangeHandler({ target: { name: "Address", value: val } });
          }}
          onSelect={(val) => {
            inputChangeHandler({ target: { name: "Address", value: val } });
          }}
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
      <div className="mb-3">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="profession"
        >
          Profession
        </label>
        <select
          className="shadow h-[38px] border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="profession"
          type="text"
          name="Profession"
          placeholder="Profession"
          onChange={inputChangeHandler}
          value={formState.Profession || ""}
        >
          <option value="">Select an option</option>
          {/* <option value="physician">Physician</option>
              <option value="nurse-practioner">Nurse Practioner</option>
              <option value="registered-nurse">Registered Nurse</option>
              <option value="health-informatics-engineer">
                Health Informatics Engineer
              </option>
              <option value="appointment-schedular">
                Appointment Schedular
              </option>
              <option value="health-executive">Health Executive</option> */}
          <option value="Physician">Physician</option>
          <option value="Nurse Practioner">Nurse Practioner</option>
          <option value="Registered Nurse-nurse">Registered Nurse</option>
          <option value="Health Informatics Engineer">
            Health Informatics Engineer
          </option>
          <option value="Appointment Schedular">Appointment Schedular</option>
          <option value="Health Executive">Health Executive</option>
        </select>
      </div>
      {formState.Profession === "Physician" && (
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="state"
          >
            Speciality
          </label>
          <select
            className="shadow h-[38px] border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="state"
            name="Specialty"
            onChange={inputChangeHandler}
            value={formState.Specialty || ""}
          >
            <option value="">Choose a specialty</option>
            {specialties.length === 0 && <option>Loading...</option>}
            {specialties.map((el, idx) => {
              return (
                <option key={"specialty" + idx} value={el}>
                  {el}
                </option>
              );
            })}
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
          className="shadow h-[38px] border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="EHR"
          type="text"
          name="EHR"
          placeholder="Primary Vendor"
          value={formState.EHR || ""}
          onChange={inputChangeHandler}
        >
          {/* <option value="">Select an option</option> */}
          {/* <option value="epic">Epic</option>
              <option value="cerner">Cerner</option>
              <option value="meditech">Meditech</option>
              <option value="cpsi">CPSI</option>
              <option value="all-scripts">Allscripts</option>
              <option value="all-scripts">Medhost</option>
              <option value="athenahealth">Athenahealth</option>
              <option value="other">None/other</option> */}
          {ehrList.map((el, idx) => {
            return (
              <option key={"ehr-item" + idx} value={el}>
                {el || "Select an option"}
              </option>
            );
          })}
          <option value={"other"}>{"other"}</option>
        </select>
      </div>
      {!ehrList.includes(formState.EHR) && (
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="ehr"
          >
            Specify EHR
          </label>
          <input
            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ehr"
            name="EHRText"
            type="text"
            placeholder=""
            value={formState.EHRText || ""}
            onChange={inputChangeHandler}
          />
        </div>
      )}
    </>
  );
};

export default RegisterForm;
