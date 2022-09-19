import Split from "react-split";
import { SuggestingTextbox } from "../SuggestingTextbox";
import VitalSigns from "../VitalSigns";

export const Editor = ({ isSideNavOpen }) => {
  return (
    <>
      {!isSideNavOpen && (
        <div className="ml-16 lg:ml-4 flex gap-8 mb-2">
          <div>Name: Ana(F) Pris(L)</div>
          <div>Age: 36</div>
          <div>MR: 344-29867</div>
        </div>
      )}
      <Split className="flex right-wrap">
        <div className="flex justify-left bg-gray-300 anamnesis-wrap">
          <div className="mb-3 w-full">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="flex items-start form-label mb-2 text-gray-700"
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
            <SuggestingTextbox
              dataTarget="active-prescriptions"
              title="Active Prescriptions"
            />
            <SuggestingTextbox dataTarget="allergies" title="Allergies" />
            <SuggestingTextbox
              dataTarget="hospitalizaion"
              title="Hospitalizaion"
            />
            <SuggestingTextbox dataTarget="lifestyle" title="Lifestyle" />
            <SuggestingTextbox dataTarget="immunization" title="Immunization" />
          </div>
        </div>

        <div className="overflow-y-hidden">
          <Split direction="vertical" style={{ height: `calc(100vh - 4rem)` }}>
            <div className="mb-[2px] xl:w-full bg-gray-300 ">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="flex items-start form-label inline-block mb-2 text-gray-700"
              >
                Findings
              </label>
            </div>
            <div className="mb-3 xl:w-full bg-gray-300">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="flex items-start form-label inline-block mb-2 text-gray-700"
              >
                Red Flags / Also Consider
              </label>
            </div>
          </Split>
        </div>

        <div className=" xl:w-full bg-gray-300">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="flex items-start form-label inline-block mb-2 text-gray-700"
          >
            Workup
          </label>
        </div>
      </Split>
    </>
  );
};

/*
      <div className='bg-gray-300'>
          <Split direction='vertical' style={{ height: `calc(100vh - 4rem)` }}>
            <div className="mb-3 xl:w-full ">
              <label htmlFor="exampleFormControlTextarea1" className="flex items-start form-label inline-block mb-2 text-gray-700">
              Findings  </label>
            </div>
            <div className="mb-3 xl:w-full ">
              <label htmlFor="exampleFormControlTextarea1" className="flex items-start form-label inline-block mb-2 text-gray-700">
              Red Flags \ Also Consider</label>
            </div>
          </Split>
        </div>


*/
