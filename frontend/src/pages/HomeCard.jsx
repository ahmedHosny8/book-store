import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";
import { useOrder } from "../context/OrderContext";

const HomeCard = ({
  books,
  favoriteBooks,
  addToFavorites,
  removeFromFavorites,
}) => {
  const { cartItems, addToCart, isloading } = useCartContext();
  const { orderBookId, isDownloadLoading } = useOrder();

  return (
    <div className="p-6 container mx-auto">
      {books.length > 0 ? (
        <div className="flex flex-wrap justify-evenly">
          {books.map((book, index) => (
            <BookCard
              _id={book._id}
              key={index}
              title={book.title}
              author={book.author}
              category={book.category}
              price={book.originalPrice}
              imageUrl={book.coverImage}
              discountedPrice={book.discountedPrice}
              discountPercentage={book.discountPercentage}
              addToFavorites={() => addToFavorites(book)}
              removeFromFavorites={() => removeFromFavorites(book._id)}
              isFavorite={Boolean(
                favoriteBooks.find((fav) => fav.bookId._id === book._id)
              )}
              addToCart={() => addToCart(book)}
              InCart={Boolean(
                cartItems.find((cart) => cart.bookId._id === book._id)
              )}
              isloading={isloading}
              isBookInOrder={Boolean(orderBookId?.includes(book._id))}
              isDownloadLoading={isDownloadLoading}
            />
          ))}
        </div>
      ) : (
        <p className="w-fit my-7 mx-auto">No Books Found</p>
      )}
    </div>
  );
};

export default HomeCard;
