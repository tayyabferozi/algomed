import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Split from "react-split";

import { SuggestingTextbox } from "../SuggestingTextbox";
import VitalSigns from "../VitalSigns";
import WorkupItem from "./WorkupItem/WorkupItem";

export const Editor = ({ isSideNavOpen }) => {
  const { id } = useSelector((state) => state.auth);
  const [findingsState, setFindingsState] = useState([]);
  const [suggestionsState, setSuggestionsState] = useState([]);
  const [redFlagsState, setRedFlagsState] = useState([]);
  const [workupState, setWorkupState] = useState([]);

  const addFinding = (obj) => {
    setFindingsState((prevState) => {
      if (prevState.findIndex((el) => el.description === obj.description) > -1)
        return prevState;

      return [...prevState, obj];
    });
  };

  const removeFinding = (e, idx) => {
    setFindingsState((prevState) => {
      const newState = [...prevState];
      newState.splice(idx, 1);
      return [...newState];
    });
  };

  const removeWorkup = (e, idx) => {
    setWorkupState((prevState) => {
      const newState = [...prevState];
      newState.splice(idx, 1);
      return [...newState];
    });
  };

  const complaintChangeHandler = (e) => {
    const { value } = e.target;

    axios.post("/diagnosis/getworkup", { id, Anamnesis: value }).then((res) => {
      // setSuggestionsState(JSON.parse(res.data.codes.replace("\\", "")));
      setSuggestionsState(res.data.codes || []);
      setRedFlagsState(res.data.redFlags || []);
      setWorkupState(res.data.workup || []);
    });

    setSuggestionsState((prevState) => {
      if (value.trim().length > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <>
      {!isSideNavOpen && (
        <div className="ml-10 lg:ml-4 flex gap-5 sm:gap-8 mb-2">
          <div className="text-xs sm:text-sm">Name: Ana(F) Pris(L)</div>
          <div className="text-xs sm:text-sm">Age: 36</div>
          <div className="text-xs sm:text-sm">MR: 344-29867</div>
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
              data={suggestionsState}
              inputChangeHandler={complaintChangeHandler}
              addFinding={addFinding}
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
                className="flex items-start form-label mb-2 text-gray-700"
              >
                Findings
              </label>
              <div>
                {findingsState.map((el, idx) => {
                  const { description, infoPageLink } = el;

                  return (
                    <div
                      key={"finding" + idx}
                      className="bg-blue-500 text-white p-1 px-2 rounded-md mb-1 text-sm mx-1"
                    >
                      <div className="flex justify-between">
                        <div>{description}</div>
                        <div className="flex space-x-1">
                          <a
                            href={infoPageLink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md bg-slate-700 w-[22px] text-center"
                          >
                            ?
                          </a>
                          <button
                            onClick={(e) => removeFinding(e, idx)}
                            className="rounded-md bg-slate-700 w-[22px] text-center"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-3 xl:w-full bg-gray-300">
              <div>
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="flex items-start form-label mb-2 text-gray-700"
                >
                  Red Flags / Also Consider
                </label>
              </div>

              <div>
                {redFlagsState.map((el, idx) => {
                  const { iconName, backColor, infolink, text } = el;

                  return (
                    <div
                      key={"redFlags" + idx}
                      style={{ background: backColor }}
                      className={`text-white p-2 rounded-md mb-1 text-sm mx-1`}
                    >
                      <div className="">
                        <div className="flex justify-between space-x-1 mb-2">
                          <img width={24} src={`/${iconName}`} alt={iconName} />
                          <a
                            href={infolink}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md bg-slate-700 w-[22px] flex items-center justify-center"
                          >
                            ?
                          </a>
                        </div>
                        <div>{text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Split>
        </div>

        <div className=" xl:w-full bg-gray-300">
          <div>
            <label
              htmlFor="exampleFormControlTextarea1"
              className="flex items-start form-label mb-2 text-gray-700"
            >
              Workup
            </label>
          </div>

          <div>
            {workupState.map((el, idx) => {
              return (
                <WorkupItem
                  key={"workup" + idx}
                  onRemove={removeWorkup}
                  idx={idx}
                  {...el}
                />
              );
            })}
          </div>
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
