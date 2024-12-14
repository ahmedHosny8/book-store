import React from 'react'

export default function ErrorInput(props) {
    const { value,
        onChanges,
        text,
        placeHolder,
        htmlFor,
        name,
        id,
        Error,
        onBlur,
        type}=props
  return (
    <div className="py-2 relative">
    <label className="mb-2 text-md text-red-700" htmlFor={htmlFor}>
     {text}
    
    </label>
    <input
      type={type}
      className="w-full p-2 border  rounded-md placeholder:font-light placeholder:text-gray-500 border-red-700 "
      name={name}
      id={id}
      placeholder={placeHolder}
      value={value}
      onChange={onChanges}
      onBlur={onBlur}
    />
    <p className='text-red-700 text-sm '> {Error}</p>
  </div>
  
  )
}
