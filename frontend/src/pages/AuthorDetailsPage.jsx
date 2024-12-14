import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";
import { useFavorites } from "../context/FavoritesContext";
import useCartContext from "../hooks/use-cart-context";
import { useOrder } from "../context/OrderContext";
const token = localStorage.getItem("token");
// import { FaSadTear } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useFavorites();
  const { orderBookId, isDownloadLoading, getOrderData } = useOrder();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, isloading } = useCartContext();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(
          `https://book-store-backend-sigma-one.vercel.app/author/${id}`
        );
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author details", error);
        setLoading(false);
      }
    };

    fetchAuthorDetails();
    if (token) {
      getOrderData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="w-full">
          <div className="mb-6 animate-pulse">
            <div className=" mx-auto rounded-full bg-gray-300 h-64 w-64 mt-6"></div>
          </div>
          <h2 className="text-4xl font-serif font-bold mb-2">
            <div className="h-8 bg-gray-300 rounded w-80 mx-auto"></div>
          </h2>

          <div className="text-center mt-4">
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly mx-auto mb-24 mt-14">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="card rounded-none animate-pulse bg-gray-200 relative"
              style={{ width: "280px" }}
            >
              <div className="w-full h-96 mx-auto"></div>
              <div className="card-body flex-grow-0 px-0 mx-0 bg-white bodyCard">
                <div className="w-24 h-4 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-40 h-6 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-32 h-4 bg-slate-300 mb-2 rounded-md"></div>
                <div className="w-48 h-6 bg-slate-300 mb-2 rounded-md"></div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                  <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!author) {
    return <div className="text-center">Author not found</div>;
  }

  return (
    <div className="container mx-auto my-6">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative mb-6">
          <img
            src={author.image}
            alt={author.name}
            className="rounded-full shadow-lg object-cover h-64 w-64"
          />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-2">{author.name}</h2>

        <div className="text-center">
          {author.books.length > 0 ? (
            <p className="italic text-gray-600 mb-4">"Available Books"</p>
          ) : null}
        </div>

        {author.books.length > 0 ? (
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 w-full">
          <div className="flex flex-wrap justify-between gap-8 mb-4 w-full">
            {author.books.map((book, index) => {
              const isFavorite = favoriteBooks.some(
                (fav) => fav.bookId._id === book.bookId._id
              );
              return (
                <BookCard
                  key={index}
                  _id={book.bookId._id}
                  title={book.bookId.title}
                  author={author.name}
                  category={book.bookId.category}
                  price={book.bookId.originalPrice}
                  discountedPrice={book.bookId.discountedPrice}
                  discountPercentage={book.bookId.discountPercentage}
                  imageUrl={book.bookId.coverImage}
                  isFavorite={isFavorite}
                  addToFavorites={() => addToFavorites(book.bookId)}
                  removeFromFavorites={() =>
                    removeFromFavorites(book.bookId._id)
                  }
                  addToCart={() => addToCart(book.bookId)}
                  InCart={Boolean(
                    cartItems.find(
                      (cart) => cart.bookId._id === book.bookId._id
                    )
                  )}
                  isloading={isloading}
                  isBookInOrder={Boolean(
                    orderBookId?.includes(book.bookId._id)
                  )}
                  isDownloadLoading={isDownloadLoading}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <FaBook className="w-16 h-16 text-gray-500 mb-4" />
            <p className="text-gray-700 text-lg font-semibold text-center">
              This author currently has no available books.
            </p>
            <p className="text-gray-500 text-sm text-center">
              Please check back later for updates or explore other authors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDetailsPage;
