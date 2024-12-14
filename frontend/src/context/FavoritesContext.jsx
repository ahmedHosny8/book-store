import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create a context
const FavoritesContext = createContext();

// Create a provider component
export const FavoritesProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data: { books: favBooks } } = await axios.get(
          `https://book-store-backend-sigma-one.vercel.app/favorites`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFavoriteBooks(favBooks);
      } catch (error) {
        //console.log(error);
      }
    };
    if (token) {
      fetchFavorites();
    }
  }, [token]);

  const addToFavorites = async (book) => {
    // setFavoriteBooks((prevFavorites) => [...prevFavorites, { bookId: book }]);

    try {
      const res=  await axios.post(
        `https://book-store-backend-sigma-one.vercel.app/favorites`,
        { bookId: book._id },
        { headers: { Authorization: "Bearer " + token } }
      );
  
        toast.success("Book added to favourites", {
          style: {
            left: "40%",
            top: "65px",
            position: "relative",
          },
        });
        
        setFavoriteBooks((prevFavorites) => [...prevFavorites, { bookId: book }]);
    } catch (error) {
      toast.error("Failed to add book to favorite.");
      console.log(error);
    }
  };

  const removeFromFavorites = async (bookId, isFromAddFavComp) => {
    setFavoriteBooks((prevFavorites) =>
      prevFavorites.filter((favBook) => favBook.bookId && favBook.bookId._id !== bookId)
    );
  
    if (isFromAddFavComp) return;
  
    try {
      await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/favorites/`,
        {
          data: { bookId },
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success("Book removed successfully", {
        style: {   left: "40%",
          top: "65px", position: "relative" },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <FavoritesContext.Provider value={{ favoriteBooks, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);
