import Split from "react-split";
import { SuggestingTextbox } from "../SuggestingTextbox";
import VitalSigns from "../VitalSigns";

export const Editor = () => {
  return (
    <Split className="flex right-wrap">
      <div class="flex justify-left bg-gray-300 anamnesis-wrap">
        <div class="mb-3 w-full">
          <label
            for="exampleFormControlTextarea1"
            class="flex items-start form-label inline-block mb-2 text-gray-700"
          >
            Anamnesis
          </label>
          <SuggestingTextbox
            dataTarget="chief-complaint"
            title="Chief Complaint"
          />
          <VitalSigns dataTarget="vitals" title="Vitals" />
          <SuggestingTextbox dataTarget="physical" title="Physical" />
          <SuggestingTextbox dataTarget="ros" title="ROS" />
          <SuggestingTextbox dataTarget="diagnosis" title="Diagnosis" />
          <SuggestingTextbox
            dataTarget="medical-history"
            title="Medical History"
          />
        </div>
      </div>

      <div>
        <Split direction="vertical" style={{ height: `calc(100vh - 4rem)` }}>
          <div class="mb-3 xl:w-full bg-gray-300 ">
            <label
              for="exampleFormControlTextarea1"
              class="flex items-start form-label inline-block mb-2 text-gray-700"
            >
              Findings
            </label>
          </div>
          <div class="mb-3 xl:w-full bg-gray-300">
            <label
              for="exampleFormControlTextarea1"
              class="flex items-start form-label inline-block mb-2 text-gray-700"
            >
              Red Flags / Also Consider
            </label>
          </div>
        </Split>
      </div>

      <div class="mb-3 xl:w-full bg-gray-300">
        <label
          for="exampleFormControlTextarea1"
          class="flex items-start form-label inline-block mb-2 text-gray-700"
        >
          Workup
        </label>
      </div>
    </Split>
  );
};

/*
      <div className='bg-gray-300'>
          <Split direction='vertical' style={{ height: `calc(100vh - 4rem)` }}>
            <div class="mb-3 xl:w-full ">
              <label for="exampleFormControlTextarea1" class="flex items-start form-label inline-block mb-2 text-gray-700">
              Findings  </label>
            </div>
            <div class="mb-3 xl:w-full ">
              <label for="exampleFormControlTextarea1" class="flex items-start form-label inline-block mb-2 text-gray-700">
              Red Flags \ Also Consider</label>
            </div>
          </Split>
        </div>


*/
