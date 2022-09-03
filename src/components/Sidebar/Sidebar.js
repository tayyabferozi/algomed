import { useState } from "react";
import $ from "jquery";

import { Editor } from "..//editor/Editor";
import Logo from "./Images/logo.png";

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
  { target: "lorem", title: "Active Prescriptions", src: "./Setting.png" },
  { target: "lorem", title: "Allergies", src: "./Setting.png" },
  { target: "lorem", title: "Hospitalization", src: "./Setting.png" },
  { target: "lorem", title: "Lifestyle", src: "./Setting.png" },
  { target: "lorem", title: "Immunization", src: "./Setting.png" },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const showSection = (target) => {
    const inputsWrap = $(".anamnesis-wrap");
    const inputsWrapTop = inputsWrap.offset().top;
    const targetEl = $(`[data-target=${target}]`);
    // console.log(targetEl.offset().top - inputsWrapTop);
    console.log(targetEl.position().top + inputsWrap.scrollTop());
    inputsWrap.scrollTop(
      targetEl.position().top + inputsWrap.scrollTop() - 64 - 28
    );
  };

  return (
    <div className="flex h-screen-wrap">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300 layout-sidebar`}
      >
        <img
          src={require("./Images/control.png")}
          className={`absolute cursor-pointer right-5 top-2 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="control"
        />
        <div className="flex gap-x-4 items-center">
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
        </div>
        <div className={`${!open ? "hidden" : ""} mt-5`}>
          <div>
            <img
              className="block w-[50px] mb-[10px]"
              src="/user-avatar.svg"
              alt="avatar"
            />
          </div>
          <div>Name: Ana(F) Pris(L)</div>
          <div>Age: 36</div>
          <div>MR: 344-29867</div>
          <div>Trans Female</div>
        </div>
        <ul className="pt-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => showSection(item.target)}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${item.gap ? "mt-5" : "mt-1"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={item.src} alt="icon" />
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-black`}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 pb-0 right-wrap-main">
        <Editor />
      </div>
    </div>
  );
};
