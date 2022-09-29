import clsx from "clsx";

export const SuggestingTextbox = ({
  inputChangeHandler,
  data: suggestions,
  dataTarget,
  addFinding,
  title,
}) => {
  return (
    <div className="mt-[20px] relative" data-target={dataTarget}>
      <h6 className="font-bold mb-[4px]">{title}</h6>
      <textarea
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
        onChange={inputChangeHandler}
      ></textarea>

      {suggestions?.length > 0 && (
        <div className="absolute left-0 right-0 bg-white z-10">
          <h5 className="opacity-40 font-bold text-[14px]">
            SUGGESTED FINDERS
          </h5>

          <div className="suggestions-main py-2">
            {suggestions.map((el, idx) => {
              const { code, relevance, description, infoPageLink } = el;

              return (
                <div
                  key={idx + code + relevance}
                  className="flex justify-between items-center m-2 gap-[6px]"
                >
                  <div className="flex gap-[8px]">
                    <div className="flex gap-[2px]">
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 1 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 2 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 3 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 4 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 5 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                      <div
                        className={clsx(
                          "rounded-md w-[7px] h-[22px]",
                          relevance >= 6 ? "bg-indigo-600" : "bg-zinc-400"
                        )}
                      ></div>
                    </div>
                    <div NameName="opacity-70">{description}</div>
                  </div>
                  <div className="flex gap-[4px]">
                    <a
                      href={infoPageLink}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:pointer-events-none"
                    >
                      ?
                    </a>
                    <button
                      onClick={() => addFinding(el)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline disabled:opacity-60 disabled:pointer-events-none"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
