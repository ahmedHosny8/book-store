import React from "react";

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-11/12 md:w-3/4 lg:w-3/4 rounded-lg p-10  relative">
      <button
        className="absolute top-0 right-2 text-black  text-2xl font-bold"
        onClick={onClose}
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
