import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import Register from "./Signup";
import Signin from "./Signin";
import { logout } from "../../store/slices/authSlice";
import ManageProfile from "./ManageProfile";
import ManageUsers from "./ManageUsers";

const navItems = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/company",
    label: "Company",
  },
  {
    href: "/diagnosis",
    label: "Diagnosis",
    authRoute: true,
  },
];

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(true);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showManageUsersModal, setShowManageUsersModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const closeModals = () => {
    setShowOverlay(false);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowUpdateProfileModal(false);
    setShowManageUsersModal(false);
  };

  const toggleModals = () => {
    if (showRegisterModal) {
      setShowLoginModal(true);
      setShowRegisterModal(false);
    } else if (showLoginModal) {
      setShowLoginModal(false);
      setShowRegisterModal(true);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {showOverlay && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm z-20 bg-[rgba(0,0,0,.1)]"
          onClick={closeModals}
        ></div>
      )}
      {showRegisterModal && (
        <Register toggleModals={toggleModals} closeModal={closeModals} />
      )}
      {showLoginModal && (
        <Signin toggleModals={toggleModals} closeModal={closeModals} />
      )}
      {showUpdateProfileModal && <ManageProfile closeModal={closeModals} />}
      {showManageUsersModal && <ManageUsers closeModal={closeModals} />}
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid grid-cols-3 flex justify-between items-center h-16">
              {/* <div className="flex items-center"> */}
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                <div className="text-[20px] text-white">Algomed</div>
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </Link>
              <div className="hidden md:flex align-center">
                <div className="ml-10 flex items-center space-x-4">
                  {navItems.map((el, idx) => {
                    const { href, label, authRoute } = el;

                    if (authRoute && !token) {
                      return (
                        <React.Fragment key={"nav-item" + idx}></React.Fragment>
                      );
                    }

                    return (
                      <NavLink
                        key={"nav-item" + idx}
                        to={href}
                        className={(isActive) => {
                          return clsx(
                            isActive
                              ? "hover:text-white text-gray-300"
                              : "text-white",
                            "hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                          );
                        }}
                      >
                        {label}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
              <div className="justify-end items-center md:flex hidden">
                {token ? (
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="flex items-center bg-transparent text-white px-5 py-2 rounded-lg hover:text-slate-300"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => {
                          setShowDropdown((prevState) => !prevState);
                        }}
                      >
                        John Doe
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {showDropdown && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div className="py-1" role="none">
                          <button
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                            role="menuitem"
                            tabindex="-1"
                            onClick={() => {
                              setShowDropdown(false);
                              setShowUpdateProfileModal(true);
                              setShowOverlay(true);
                            }}
                          >
                            Manage Profile
                          </button>
                          <button
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                            role="menuitem"
                            tabindex="-1"
                            onClick={() => {
                              setShowDropdown(false);
                              setShowManageUsersModal(true);
                              setShowOverlay(true);
                            }}
                          >
                            Manage Users
                          </button>
                          <button
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                            role="menuitem"
                            tabindex="-1"
                            onClick={() => {
                              logoutHandler();
                              setShowDropdown(false);
                            }}
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {" "}
                    <button
                      className="bg-transparent text-white px-5 py-2 rounded-lg hover:text-slate-300"
                      onClick={() => {
                        setShowOverlay(true);
                        setShowLoginModal(true);
                      }}
                    >
                      {" "}
                      Sign In
                    </button>
                    <button
                      className="bg-indigo-700 text-white px-5 py-2 rounded-lg hover:bg-indigo-600"
                      onClick={() => {
                        setShowOverlay(true);
                        setShowRegisterModal(true);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
              {/* </div> */}
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((el, idx) => {
                    const { label, href, authRoute } = el;

                    if (authRoute && !token) {
                      return (
                        <React.Fragment key={"nav-item" + idx}></React.Fragment>
                      );
                    }

                    return (
                      <NavLink
                        key={"mobile-item" + idx}
                        to={href}
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {label}
                      </NavLink>
                    );
                  })}
                  {token ? (
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="flex items-center bg-transparent text-white px-3 py-2 rounded-md text-base font-medium"
                          id="menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                          onClick={() => {
                            setShowDropdown((prevState) => !prevState);
                          }}
                        >
                          John Doe
                          <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {showDropdown && (
                        <div
                          className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabindex="-1"
                        >
                          <div className="py-1" role="none">
                            <button
                              className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                              role="menuitem"
                              tabindex="-1"
                              onClick={() => {
                                setShowDropdown(false);
                                setShowUpdateProfileModal(true);
                                setShowOverlay(true);
                              }}
                            >
                              Manage Profile
                            </button>
                            <button
                              className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                              role="menuitem"
                              tabindex="-1"
                              onClick={() => {
                                setShowDropdown(false);
                                setShowManageUsersModal(true);
                                setShowOverlay(true);
                              }}
                            >
                              Manage Users
                            </button>
                            <button
                              className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                              role="menuitem"
                              tabindex="-1"
                              onClick={() => {
                                logoutHandler();
                                setShowDropdown(false);
                              }}
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {" "}
                      <button
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => {
                          setShowOverlay(true);
                          setShowLoginModal(true);
                        }}
                      >
                        Log In
                      </button>
                      <button
                        className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => {
                          setShowOverlay(true);
                          setShowRegisterModal(true);
                        }}
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
      <Outlet context={isOpen} />
    </>
  );
};
