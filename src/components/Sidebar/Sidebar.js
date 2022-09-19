import { useState } from "react";
import $ from "jquery";

import { Editor } from "../editor/Editor";

const menuItems = [
  // { title: "Dashboard", src: "./Chart_fill.png" },
  { target: "chief-complaint", title: "Chief Compaint", src: "./Chat.png" },
  { target: "vitals", title: "Vitals", src: "./User.png", gap: true },
  { target: "physical", title: "Physical ", src: "./Calendar.png" },
  { target: "ros", title: "ROS", src: "./Search.png" },
  { target: "diagnosis", title: "Diagnosis", src: "./Chart.png" },
  {
    target: "medical-history",
    title: "Medical History",
    src: "./Folder.png",
  },
  {
    target: "active-prescriptions",
    title: "Active Prescriptions",
    src: "./Setting.png",
  },
  { target: "allergies", title: "Allergies", src: "./Setting.png" },
  { target: "hospitalizaion", title: "Hospitalization", src: "./Setting.png" },
  { target: "lifestyle", title: "Lifestyle", src: "./Setting.png" },
  { target: "immunization", title: "Immunization", src: "./Setting.png" },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const showSection = (target) => {
    const inputsWrap = $(".anamnesis-wrap");
    const targetEl = $(`[data-target=${target}]`);
    inputsWrap.scrollTop(
      targetEl.position().top + inputsWrap.scrollTop() - 64 - 28
    );
  };

  return (
    <div className="flex h-screen-wrap">
      <div
        className={`lg:hidden fixed z-10 top-0 bottom-0 bg- w-[100%] opacity-50 bg-black ${
          open ? "left-0" : "left-[-100%]"
        }`}
        onClick={() => setOpen(!open)}
      ></div>
      <div
        className={` ${
          open ? "lg:w-64 left-0" : "lg:w-20 -left-[288px]"
        } bg-white h-screen p-5 pt-8 duration-300 layout-sidebar absolute lg:relative w-64 lg:left-0 z-10`}
      >
        <img
          src={require("./Images/control.png")}
          className={`absolute cursor-pointer top-2 w-7 border-dark-purple
           border-2 rounded-full  ${!open ? "rotate-180 right-6" : "right-5"}`}
          onClick={() => setOpen(!open)}
          alt="control"
        />
        {/* <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt="logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Ana(F) Pris(L)
          </h1>
        </div> */}
        <div className={`${!open ? "lg:hidden" : ""} mt-3`}>
          <div className="flex align-top gap-5">
            <img
              className="block w-[50px] mb-[10px]"
              src="/user-avatar.svg"
              alt="avatar"
            />
            <div>
              <div>Name: Ana(F) Pris(L)</div>
              <div>Age: 36</div>
              <div>MR: 344-29867</div>
              <div>
                <select defaultValue={"trans-female"}>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Female GI - M</option>
                  <option>Male GI - F</option>
                  <option value={"trans-female"}>Trans Female</option>
                  <option>Trans Male</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <ul className="pt-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => showSection(item.target)}
              className={`flex  rounded-md py-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${item.gap ? "mt-5" : "mt-1"} ${
                index === 0 && "bg-light-white"
              } ${open ? "px-0" : "px-2"} `}
            >
              <img src={item.src} alt="icon" />
              <span
                className={`${
                  !open && "lg:hidden"
                } origin-left duration-200 text-black`}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 pt-3 pb-3 pe-3 right-wrap-main relative">
        <img
          src={require("./Images/control.png")}
          className={`absolute cursor-pointer left-2 top-1 w-7 border-dark-purple lg:hidden block
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="control"
        />
        <Editor isSideNavOpen={open} />
      </div>
    </div>
  );
};
