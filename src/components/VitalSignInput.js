import React from "react";

const VitalSignInput = ({ title, double, number }) => {
  return (
    <div className="mt-[4px]">
      <div className="label font-regular opacity-60 text-[14px]">
        {title.toUpperCase()}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          step={0.1}
          max={99.99}
          className="w-[100%] mt-1 rounded-md px-2 py-2"
        />

        {double && (
          <>
            <div className="">/</div>
            <input
              type="number"
              step={0.1}
              max={99.99}
              className="w-[100%] mt-1 rounded-md px-2 py-2"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VitalSignInput;
