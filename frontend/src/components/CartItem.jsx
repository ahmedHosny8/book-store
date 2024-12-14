/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function CartItem(props) { 
  const { book } = props;
  // console.log(book);
  const { cartItems, setCartItems,deleteBookById } = useCartContext();
  const token = localStorage.getItem("token");
  // console.log(cartItems);
  // const deleteBookById = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `https://book-store-backend-sigma-one.vercel.app/cart/remove-item/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         data: {
  //           bookId: id,
  //         },
  //       }
  //     );
  //     setCartItems(cartItems.filter((item) => item.bookId._id != id));
  //   } catch (error) {
  //     console.log("Error deleting item:", error);
  //   }
  // };
  // console.log(book);

  {
    return cartItems?.length > 0 ? (
      <div
        key={book.bookId}
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
      >
        <div
          key={book.bookId}
          className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
        >
          <Link
            to={`/books/${book.bookId?._id}`}
            className="shrink-0 md:order-1"
          >
            <img
              className="w-32"
              src={book?.bookId?.coverImage}
              alt="imac image"
            />
          </Link>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="text-end md:order-4 md:w-32">
              {book?.bookId?.discountPercentage ? (
                <div className="">
                  <p className="text-xl font-sans font-bold line-through">
                    {book?.bookId?.originalPrice} EGP
                  </p>
                  <p className="text-xl font-sans font-bold text-green-600">
                    {" "}
                    {book?.bookId?.discountedPrice} EGP
                  </p>
                </div>
              ) : (
                <p className="text-xl font-sans font-bold">
                  {book?.bookId?.originalPrice} EGP
                </p>
              )}
            </div>
          </div>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <Link
              to={`/books/${book.bookId?._id}`}
              className="text-3xl font-medium text-gray-900 hover:underline"
            >
              {book?.bookId?.title}{" "}
            </Link>
            <Link to={`/books/${book.bookId?._id}`}>
              <p className="text-gray-900 opacity-70 text-[15px] my-2">
                {book?.bookId?.author}
                {" | "}
                {book?.bookId?.category}
              </p>
              <p className="text-gray-900 opacity-70 text-[15px] text-ellipsis overflow-hidden line-clamp-3">
                {book?.bookId?.description}
              </p>
            </Link>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => deleteBookById(book.bookId?._id)}
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
              >
                <svg
                  className="me-1.5 h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      // <div key={book.bookId}>
      //   <li
      //     key={book.bookId}
      //     className="relative h-52 flex gap-x-5 mb-5 border shadow-2xl bg-white rounded-md"
      //   >
      //     <Link to={`/books/${book.bookId?._id}`} className="w-32 h-36">
      //       <div className="relative w-full h-full rounded-md shadow-2xl ">
      //         <img
      //           className="absolute inset-0 w-full h-52 object-cover object-center"
      //           src={book.bookId.coverImage}
      //           alt="Book Image"
      //         />
      //       </div>
      //     </Link>
      //     <div className="flex flex-col items-start justify-center gap-2">
      //       <div>
      //         <span className="text-sm uppercase text-rose-500">
      //           {book.bookId.category}
      //         </span>
      //         <Link to={`/books/${book.bookId?._id}`}>
      //           <h2 className="font-medium">{book.bookId.title}</h2>
      //         </Link>
      //       </div>
      //       <Link to="">
      //         <span className="text-sm text-gray-600">
      //           {book.bookId.author}
      //         </span>
      //       </Link>
      //       <span className="text-lg font-medium">{book.bookId.price}</span>
      //       <button
      //         className="absolute right-2 bottom-2 btn py-3 rounded-md btn-error"
      //         onClick={() => deleteBookById(book.bookId?._id)}
      //       >
      //         <FaTrash color="white" />
      //       </button>
      //     </div>
      //   </li>
      // </div>
      <p className="w-fit my-7 mx-auto">No Data Found</p>
    );
  }
}
export default CartItem;
