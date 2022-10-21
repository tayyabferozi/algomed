import React from "react";
import VitalSignInput from "./VitalSignInput";

const VitalSigns = ({ dataTarget, title }) => {
  return (
    <div className="mt-[20px]" data-target={dataTarget}>
      <h5 className="font-bold mb-[4px]">{title}</h5>

      <div className="inputs px-2 py-3 mx-2 border-2 border-zinc-10 rounded-lg">
        <div className="grid grid-rows-2 grid-flow-col gap-4">
          <VitalSignInput title="Pulse" number />
          <VitalSignInput title="Temperature (C)" number />
          <VitalSignInput title="Respiration" number />
          <VitalSignInput title="Weight (KG)" number />
          <VitalSignInput title="Blood Pressure" double number />
          <VitalSignInput title="Height (CM)" number />
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
