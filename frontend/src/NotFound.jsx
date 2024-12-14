import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className=" flex  flex-col justify-center items-center mt-16 ">
    <img 
      src='/404Error.webp' 
      alt='Error 404' 
      
    />
   <Link to="/"  className="text-center w-36 h-10 rounded-lg px-9 py-2 bg-brown-200  hover:bg-white hover:cursor-pointer hover:border  hover:text-black hover:border-brown-200">
    Go Home
   </Link>
    
  </div>
  )
}
