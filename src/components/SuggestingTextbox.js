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
    <div className="mt-[20px] relative" data-target={dataTarget}>
      <h6 className="font-bold mb-[4px]">{title}</h6>
      <textarea
        onChangeCapture={inputChangeHandler}
        class="
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
        <div className="absolute left-0 right-0 bg-white z-10">
          <h5 className="opacity-40 font-bold text-[14px]">
            SUGGESTED FINDERS
          </h5>

          <div className="suggestions-main py-2">
            <div className="flex justify-between items-center m-2 gap-[6px]">
              <div className="flex gap-[8px]">
                <div className="flex gap-[2px]">
                  <div className="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                </div>
                <div className="opacity-70">Other constipation</div>
              </div>

              <button className="bg-indigo-600 rounded-md px-4 py-1">
                <div className="text flex items-center gap-3">
                  <div className="text-white text-lg">+</div>
                  <span className="ms-3 text-white text-base">Add</span>
                </div>
              </button>
            </div>

            <div className="flex justify-between items-center m-2 gap-[6px]">
              <div className="flex gap-[8px]">
                <div className="flex gap-[2px]">
                  <div className="bg-indigo-600 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                  <div className="bg-zinc-400 rounded-md w-[8px] h-[22px]"></div>
                </div>
                <div className="opacity-70">Abnormal weight loss</div>
              </div>

              <button className="bg-indigo-600 rounded-md px-4 py-1">
                <div className="text flex items-center gap-3">
                  <div className="text-white text-lg">+</div>
                  <span className="ms-3 text-white text-base">Add</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
