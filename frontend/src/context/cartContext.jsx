/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

const CartContext = createContext();

function CartProvider({ children }) {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const [isloading, setLoading] = useState(false);
  //const { id } = useParams();
  const getUserCartItems = async () => {
    try {
      // setLoading(true);
      const res = await axios.get(
        "https://book-store-backend-sigma-one.vercel.app/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      setCartItems(data.items);
      setLoading(false);
    } catch (error) {
      //console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (book) => {
    setLoading(true);
   // console.log(book);

    try {
      const res = await axios.post(
        "https://book-store-backend-sigma-one.vercel.app/cart/",
        { bookId: book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(res);
      if (res.status === 201) {
        toast.success("Book added to cart successfully!" , {
          style: {position: "relative",left: "40%",
            top: "65px", }
        }

        );
        setCartItems((prevCartItem) => [...prevCartItem, { bookId: book }]);
        //setCartItems(res.data.items);
        setLoading(false);
      } else {
        toast.error("Failed to add book to cart.");
      }
    } catch (error) {
      console.log("Error adding book to cart:", error);
      toast.error("There was an error adding the book to the cart.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const deleteBookById = async (id) => {
    setCartItems(cartItems.filter((item) => item.bookId._id != id));
    try {
      const res = await axios.delete(
        `https://book-store-backend-sigma-one.vercel.app/cart/remove-item/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            bookId: id,
          },
        }
      );

      setCartItems((prevCartItem) =>
        prevCartItem.filter(
          (cartBook) => cartBook.bookId && cartBook.bookId._id !== id
        )
      );

      toast.success("Book deleted from cart successfully!" , {
        style: {position: "relative",left: "40%",
          top: "65px", },
      }

      );
    } catch (error) {
      console.log("Error deleting item:", error);
      toast.error("There was an error in deleting the book from the cart.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserCartItems();
      setLoading(false);
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getUserCartItems,
        isloading,
        setLoading,
        addToCart,
        deleteBookById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
