import React, { useRef } from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import $ from "jquery";

const WorkupItem = ({ idx, icon, title, infolink, text, onRemove }) => {
  const textRefEl = useRef();

  const toggleCloseHandler = () => {
    $(textRefEl.current).slideToggle();
  };

  return (
    <div className={`bg-blue-500 text-white p-2 rounded-md mb-1 text-sm mx-1`}>
      <div className="">
        <div className="flex justify-between items-center space-x-1">
          <div className="flex items-center space-x-3">
            <img src={`/${icon}`} alt={icon} style={{ height: 24 }} />
            <div>{title}</div>
          </div>
          <div className="flex space-x-1">
            <CopyToClipboard
              text={text}
              onCopy={() => {
                toast.info("Copied to clipboard");
              }}
            >
              <button className="rounded-md p-1 bg-slate-700 w-[22px] flex items-center justify-center">
                <img className="w-100 invert" src="/copy.png" alt="copy" />
              </button>
            </CopyToClipboard>
            <button
              onClick={toggleCloseHandler}
              className="rounded-md bg-slate-700 w-[22px] flex items-center justify-center"
            >
              -
            </button>
            <button
              onClick={(e) => onRemove(e, idx)}
              className="rounded-md bg-slate-700 w-[22px] flex items-center justify-center"
            >
              X
            </button>
          </div>
        </div>
        <div ref={textRefEl} className="mt-2">
          {text}
        </div>
      </div>
    </div>
  );
};

export default WorkupItem;
