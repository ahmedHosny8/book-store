import React from "react";

export default function Input(props) {
  const {
    value,
    onChanges,
    text,
    placeHolder,
    htmlFor,
    name,
    id,
    onBlur,
    type,
  } = props;
  return (
    <div className="py-3 relative">
      <label className="mb-2 text-md text-[#545c72]" htmlFor={htmlFor}>
        {text}
      </label>
      <input
        type={type}
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        name={name}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChanges}
        onBlur={onBlur}
      />
    </div>
  );
}
