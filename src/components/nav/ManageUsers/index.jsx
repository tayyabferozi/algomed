import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Confirm from "../../Confirm";

import AddUser from "./AddUser";

const ManageUsers = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [usersState, setUsersState] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUser = () => {
    setIsLoading(true);

    axios
      .get("/accounts")
      .then((res) => {
        setUsersState(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeAddUserModal = () => {
    setShowOverlay(false);
    setShowAddUserModal(false);
  };

  const onCancelDelete = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  const onDeleteUser = (id) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  const onDeleteUserConfirmed = () => {
    setUserToDelete(null);
    setShowConfirmModal(false);

    axios
      .delete("/accounts/" + userToDelete)
      .then((res) => {
        toast.success("User deleted successfully!");
        loadUser();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Uh Oh! Something went wrong");
      });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      {showOverlay && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-30 bg-[rgba(0,0,0,.1)]"
          onClick={closeAddUserModal}
        ></div>
      )}
      {showConfirmModal && (
        <Confirm onConfirm={onDeleteUserConfirmed} onCancel={onCancelDelete} />
      )}
      {showAddUserModal && <AddUser closeModal={closeAddUserModal} />}
      <div className="w-full max-w-5xl fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20 max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-100 rounded-t font-bold text-xl px-8 py-4">
          <div className="text-700">Manage Users</div>
        </div>
        <div className="bg-white shadow-md rounded-b pt-6">
          <div className="mb-5 ml-8">
            <button
              onClick={() => {
                setShowAddUserModal(true);
                setShowOverlay(true);
              }}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add user
            </button>
          </div>

          <div className="overflow-x-auto relative">
            {isLoading ? (
              <div className="m-8">Loading...</div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Role
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Coder
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Admin
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersState.map((el, idx) => {
                    const {
                      id,
                      firstName,
                      lastName,
                      email,
                      role,
                      coder,
                      admin,
                    } = el;

                    return (
                      <tr
                        key={"user" + idx}
                        className="bg-white dark:bg-gray-800"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {firstName + " " + lastName}
                        </th>
                        <td className="py-4 px-6">{email}</td>
                        <td className="py-4 px-6">{role}</td>
                        <td className="py-4 px-6">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            defaultChecked={coder}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            defaultChecked={admin}
                          />
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => onDeleteUser(id)}
                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex items-center gap-5"></div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
