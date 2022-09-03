import Split from "react-split";
import { SuggestingTextbox } from "../SuggestingTextbox";

export const Editor1 = () => {
  return (
    <Split direction="vertical" style={{ height: `calc(100vh - 4rem)` }}>
      <Split className="flex">
        <div class="flex justify-left">
          <div class="mb-3 xl:w-full">
            <label
              for="exampleFormControlTextarea1"
              class="flex items-start form-label inline-block mb-2 text-gray-700"
            >
              History of Present Illness (HPI)
            </label>
            <SuggestingTextbox />
          </div>
        </div>

        <div className="bg-gray-300"></div>
        <div className="bg-gray-300"></div>
      </Split>
      <div className="bg-gray-400"></div>
    </Split>
  );
};
