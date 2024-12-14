import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useCartContext from "../hooks/use-cart-context";

const OrderContext = createContext({});
const token = localStorage.getItem("token");
export const OrderContextProvider = ({ children }) => {
  const [orderBookId, setOrderBookId] = useState([]);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const { setCartItems } = useCartContext();

  const getOrderData = async () => {
    setIsDownloadLoading(true)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      "https://book-store-backend-sigma-one.vercel.app/orders",
      config
    );
    if (res.status === 200) {
      const bookOrder = res.data.map((order) => {
        return order.books;
      });
      const flattenedBooks = bookOrder?.flat();

      const bookIds = flattenedBooks.map((book) => {
        return book.bookId?._id;
      });

      setOrderBookId(bookIds);
      
    }
  }

  useEffect(() => {
    if (token) {
      getOrderData();
     
      setIsDownloadLoading(false);
    }
  }, [token]);
  return (
    <OrderContext.Provider
      value={{ orderBookId, setOrderBookId,isDownloadLoading,getOrderData}}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => useContext(OrderContext);
