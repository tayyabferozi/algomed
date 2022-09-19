import React from "react";

const AddUser = ({ closeModal }) => {
  const formSubmitHandler = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div className="w-full max-w-xl fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-30 max-h-[90vh] overflow-y-auto">
      <div className="bg-slate-100 rounded-t font-bold text-xl px-8 py-4">
        <div className="text-700">Add User</div>
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

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="">
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
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="coder"
              >
                Coder
              </label>

              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                class="mt-5 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="">
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
          </div>
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
        <div className="flex items-center gap-4 mt-6">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#0"
            onClick={closeModal}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
