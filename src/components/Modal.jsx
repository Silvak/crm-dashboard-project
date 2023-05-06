import React, { useState } from "react";
import { FiX } from "react-icons/fi";

function Modal(props) {
  const children = props.children;
  const [visible, setVisible] = useState(false);
  const open = () => {
    setVisible(!visible);
  };
  if (visible === true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <div>
      <div onClick={open}>{props.btn}</div>
      {visible ? (
        <div className="fixed top-0 left-0 z-50 bg-gray-600/50 h-full w-full flex justify-center items-center">
          <div className="relative bg-white w-[100%] sm:w-[52%] min-h-[32%] rounded-sm shadow-lg z-50 px-3 pt-10 pb-3">
            {children}
            <div
              className="absolute top-3 right-3 text-2xl text-[#758595] cursor-pointer"
              onClick={open}
            >
              <FiX />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Modal;
