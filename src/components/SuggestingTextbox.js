import { useState } from "react";

const handleMessageChange = (event) => {};

export const SuggestingTextbox = ({ dataTarget, title }) => {
  const [suggestions, setSuggestions] = useState(false);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setSuggestions((prevState) => {
      if (value.trim().length > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <div className="mt-[20px]" data-target={dataTarget}>
      <h6 className="font-bold mb-[4px]">{title}</h6>
      <textarea
        onChangeCapture={inputChangeHandler}
        className="
                form-control
                block
                w-full
                h-50
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
                "
        id="HPI"
        rows="3"
        placeholder="Type HPI in this box..."
        name="HPI"
        onChange={handleMessageChange}
      ></textarea>

      {suggestions && (
        <div>
          <h5 NameName="opacity-40 font-bold text-[14px]">SUGGESTED FINDERS</h5>

          <div NameName="suggestions-main">
            <div NameName="flex justify-between m-2 gap-[6px]">
              <div NameName="flex gap-[8px]">
                <div NameName="flex gap-[2px]">
                  <div NameName="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                </div>
                <div NameName="opacity-70">Other constipation</div>
              </div>

              <button NameName="bg-indigo-600 rounded-md px-4 py-2">
                <div NameName="tex flex gap-3">
                  <div NameName="text-white text-lg">+</div>
                  <span NameName="ms-3 text-white text-lg">Add</span>
                </div>
              </button>
            </div>

            <div NameName="flex justify-between m-2 gap-[6px]">
              <div NameName="flex gap-[8px]">
                <div NameName="flex gap-[2px]">
                  <div NameName="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div NameName="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                </div>
                <div NameName="opacity-70">Abnormal weight loss</div>
              </div>

              <button NameName="bg-indigo-600 rounded-md px-4 py-2">
                <div NameName="tex flex gap-3">
                  <div className="text-white text-lg">+</div>
                  <span className="ms-3 text-white text-lg">Add</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
