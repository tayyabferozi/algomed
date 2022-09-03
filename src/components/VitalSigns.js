import React from "react";
import VitalSignInput from "./VitalSignInput";

const VitalSigns = ({ dataTarget, title }) => {
  return (
    <div className="mt-[20px]" data-target={dataTarget}>
      <h5 className="font-bold mb-[4px]">{title}</h5>

      <div className="inputs">
        <VitalSignInput title="Pulse" />
        <VitalSignInput title="Respiration" />
        <VitalSignInput title="Blood Pressure" />
        <VitalSignInput title="Temperature" />
        <VitalSignInput title="Height" />
        <VitalSignInput title="Height" />
      </div>
    </div>
  );
};

export default VitalSigns;
