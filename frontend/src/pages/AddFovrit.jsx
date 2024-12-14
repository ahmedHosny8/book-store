import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext";
import { Link, useNavigate } from "react-router-dom";
import { PiListHeartLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import CartContext from "../context/cartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { useOrder } from "../context/OrderContext";
import toast from "react-hot-toast";

const AddFovrit = () => {
  const { favoriteBooks, removeFromFavorites } = useFavorites();
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart } = useContext(CartContext);
  const { orderBookId, getOrderData } = useOrder();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const {
          data: { books: favBooks },
        } = await axios.get(
          "https://book-store-backend-sigma-one.vercel.app/favorites",
          { headers: { Authorization: "Bearer " + token } }
        );

        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    };
    fetchFavorites();
    if (token) {
      getOrderData();
    }
  }, [token]);

  const deleteFav = async (bookId) => {
    if (!bookId) return;
    removeFromFavorites(bookId, true);

    try {
      await axios.delete(
        "https://book-store-backend-sigma-one.vercel.app/favorites/",
        {
          data: { bookId },
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success("Book removed successfully", {
        style: { position: "relative", left: "40%", top: "65px" },
      });
    } catch (error) {
      console.log("Error deleting item:", error.massege);
      toast.error(
        "There was an error in deleting the book from the favourite."
      );
    }
  };

  const isBookInCart = (bookId) => {
    return Boolean(cartItems.find((cart) => cart.bookId?._id === bookId));
  };

  const isBookInOrder = (bookId) => {
    return orderBookId.includes(bookId);
  };

  return (
    <div className="container mx-auto p-4 pb-10">
      <h1 className="text-3xl font-bold mt-5 mb-10 text-center">
        My Favorite Books
      </h1>
      {loading ? (
        <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto">
          <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-full grid gap-4">
            {favoriteBooks.length > 0 ? (
              <table className="table-auto tab-border-3 w-full text-center shadow-md rounded-lg mb-8">
                <thead>
                  <tr className="bg-slate-200 tab-border-2  text-sm leading-normal">
                    <th className="py-4 px-2">Book</th>
                    <th className="py-4 px-2">Title</th>
                    <th className="py-4 px-2">Author</th>
                    <th className="py-4 px-2">Price</th>
                    <th className="py-4 px-2">Remove</th>
                    <th className="py-4 px-2">Add to Cart</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {favoriteBooks.map((book) => (
                    <tr
                      key={book.bookId?._id}
                      className="border-t border-gray-200 hover:bg-gray-100"
                    >
                      <td
                        className="py-4 px-2 flex justify-center cursor-pointer"
                        onClick={() => navigate(`/books/${book.bookId._id}`)}
                      >
                        <img
                          src={book.bookId?.coverImage || ""}
                          alt={book.bookId?.title || "No title"}
                          className="w-20 h-24 rounded object-cover"
                        />
                      </td>

                      <td className="py-4 px-2">
                        <p
                          className="text-lg font-semibold text-gray-800  cursor-pointer"
                          onClick={() => navigate(`/books/${book.bookId._id}`)}
                        >
                          {book.bookId?.title || "No Title"}
                        </p>
                      </td>

                      <td className="py-4 px-2">
                        <p
                          className="text-gray-800 font-semibold text-lg  cursor-pointer"
                          onClick={() => navigate(`/authors/`)}
                        >
                          {book.bookId?.author || "Unknown Author"}
                        </p>
                      </td>

                      <td className="py-4 px-2">
                        <span className="text-gray-700 font-semibold">
                          {book.bookId?.originalPrice || "0.00"}EGP
                        </span>
                      </td>

                      <td className="py-3 px-6">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteFav(book.bookId?._id)}
                        >
                          <FaRegTrashCan size={25} />
                        </button>
                      </td>

                      <td className="py-3 px-6">
                        {isBookInOrder(book.bookId?._id) ? (
                          <button onClick={() => navigate("/library")}>
                            <span className="text-blue-950 font-bold">
                              Already Bought
                            </span>
                          </button>
                        ) : isBookInCart(book.bookId?._id) ? (
                          <span className="text-blue-950 font-bold">
                            Added to Cart
                          </span>
                        ) : (
                          <button
                            className="text-blue-950"
                            onClick={() => addToCart(book.bookId)}
                          >
                            <MdAddShoppingCart size={30} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col justify-center items-center py-20">
                <PiListHeartLight className="text-blue-950 text-8xl mb-6" />

                <p className="text-2xl text-gray-700 font-semibold mb-4">
                  Your favorite list is currently empty.
                </p>

                <p className="text-lg text-gray-500 mb-8">
                  Add some books to your favorite list by clicking on the heart
                  icon.
                </p>
                <Link
                  to="/books"
                  className="px-6 py-3 bg-blue-950 hover:bg-blue-950 hover:text-[#dbb891] text-white text-lg rounded-lg shadow-md transition-all duration-300"
                >
                  Return to Books
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFovrit;
