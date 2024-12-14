import React from 'react';
import { FaBookOpen, FaUniversity } from 'react-icons/fa';
import { GiWhiteBook } from "react-icons/gi";
import { GiRead } from "react-icons/gi";




const LogosSection = () => {
  return (
    <div className="logos-section py-8">
      <div className="container mx-auto flex justify-evenly items-center">
        
        <div className="text-center">
          <FaBookOpen className="text-gray-800 w-16 h-16 mx-auto mb-2" />
          <h4 className="text-lg font-semibold">Bookland</h4>
     
        </div>

        
        <div className="text-center">
          <FaUniversity className="text-gray-800 w-16 h-16 mx-auto mb-2" />
          <h4 className="text-lg font-semibold">Library</h4>
        </div>

        <div className="text-center">
          <GiWhiteBook   className="text-gray-800 w-16 h-16 mx-auto mb-2" />
          <h4 className="text-lg font-semibold">Books</h4>
         
        </div>

        <div className="text-center">
          <GiRead  className="text-gray-800 w-16 h-16 mx-auto mb-2" />
          <h4 className="text-lg font-semibold">Read</h4>
        </div>
      </div>
    </div>
  );
};

export default LogosSection;
