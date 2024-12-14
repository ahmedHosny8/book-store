/* eslint-disable react/prop-types */
import { maskNumbers } from '../utils/helpers';
import { FaTrash } from 'react-icons/fa';

function Cards({ card, onDelete }) {
  return (
    <div className="container mx-auto  rounded-2xl transition-all transform hover:scale-105 duration-300  border-gray-200  bg-gradient-to-br from-gray-50 to-gray-100">
      {/* <div className=" container mx-auto   border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white relative"> */}
   
        <div className="absolute bottom-1 right-5">
          <button
            className="text-red-500 text-xs hover:text-red-600 transition duration-300"
            onClick={() => onDelete(card._id)}
          >Delete
            {/* <FaTrash size={15} /> */}
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center my-6">

          <div className="w-full">
            <img
              className="object-cover w-full h-full rounded-xl"
              src="/profile/credit-card.png"
              alt="Credit Card"
            />
          </div>
          
          <div className="flex flex-col text-left ">
            <p className="font-semibold text-lg text-gray-800">
              {card.cardholderName}
            </p>

            <p className="text-gray-600   lg:tracking-widest text-sm">
              {maskNumbers(card.cardNumber)}
            </p>

            <p className="text-gray-600 font-mono tracking-widest text-sm">
              {card.expiryDate}
            </p>
          </div>

        </div>
      {/* </div> */}
      
    </div>
  );
}

export default Cards;

