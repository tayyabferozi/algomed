import React from "react";

const VitalSignInput = ({ title }) => {
  return (
    <div className="flex gap-[10px] mt-[4px]">
      {title} <input className="w-[40px]" />
    </div>
  );
};

export default VitalSignInput;
