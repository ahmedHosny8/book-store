/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ReviewedBook({ review }) {
  //console.log(review);
  const [book, setBook] = useState({});
  //console.log(book);

  const bookId = review.bookId?._id;

  const getBookById = async (id) => {
    try {
      const res = await axios.get(
        `https://book-store-backend-sigma-one.vercel.app/book/${id}`
      );

      const data = res.data;

      setBook({ ...data });
    } catch (error) {
      console.log('There is an error loading data...', error);
    }
  };

  useEffect(() => {
    getBookById(bookId);
  }, [bookId]);

  return (
    <div className="grid grid-cols-4 border rounded-tr-xl rounded-bl-xl overflow-hidden">
      <img
        className="h-full w-full object-cover object-center"
        src={book.coverImage}
        alt="Book Image"
      />
      <div className="col-span-3 flex flex-col justify-center py-2 px-3 ">
        <h3 className="font-poppins font-semibold text-base text-brand-black">
          {book.title}
        </h3>
        <p className="font-poppins text-sm text-gray-600">{book.author}</p>
        <p className="font-poppins text-sm text-slate-600 mt-2">
          {review.comment}
            </p>
        <div className="mt-2 flex items-center gap-2">
          
          <p className="font-poppins text-sm text-brand-black">Your rating:</p>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#fcc419" 
              stroke="#fcc419"
              className="h-6 w-6"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="font-poppins text-sm text-gray-600">
              {review.rating}.0
            </p>
            
          </div>
          
        </div>

        <Link
          className="text-sm text-blue-500 hover:text-blue-600 hover:underline self-end"
          to={`/books/${book?._id}`}
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ReviewedBook;
