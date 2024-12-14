/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaShoppingBagSolid } from "react-icons/lia";

import CartItem from "../components/CartItem";
import { UserContext } from "../hooks/UserContext";
import useCartContext from "../hooks/use-cart-context";
import OrderComponents from "../components/OrderComponents";
import Swal from "sweetalert2";
import axios from "axios";

function CartPage() {
  const { getUserCartItems, cartItems, setLoading, isloading } =
    useCartContext();
  const { userInfo } = useContext(UserContext);
  const userName = userInfo?.username;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // try {
    if (userName) {
      getUserCartItems();
    }
    // } catch (err) {}
  }, [userName]);

  const calculateTotalPrice = () => {
    return (
      cartItems.reduce(
        (total, item) =>
          item?.bookId?.discountedPrice
            ? total + item?.bookId?.discountedPrice
            : total + item?.bookId?.originalPrice,
        0
      ) + calculateTax()
    );
  };
  const calculateOriginalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item?.bookId?.originalPrice,
      0
    );
  };
  const calculateTotalSavings = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item?.bookId?.originalPrice * (item?.bookId?.discountPercentage / 100),
      0
    );
  };
  const calculateTax = () => {
    return cartItems.reduce(
      (total, item) => total + item?.bookId?.discountedPrice * (10 / 100),
      0
    );
  };

  if (isloading) {
    return (
      <div className="flex justify-center items-center relative top-0 left-0 h-[50vh] w-fit my-[6.75rem] mx-auto">
        <img src="/loader.gif" alt="Loading..." className="w-full h-full" />
      </div>
    );
  } else {
    const renderedItems = cartItems.map((book, index) => {
      return <CartItem key={index} book={book} />;
    });

    return cartItems.length > 0 ? (
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">{renderedItems}</div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <OrderComponents
                calculateTotalPrice={calculateTotalPrice}
                calculateOriginalPrice={calculateOriginalPrice}
                calculateTotalSavings={calculateTotalSavings}
                calculateTax={calculateTax}
                isLoading={isloading}
              />
            </div>
          </div>
        </div>
      </section>
    ) : (
      <div className="flex flex-col justify-center items-center my-32 mx-auto text-center ">
        <LiaShoppingBagSolid
          className="text-blue-950  mb-4 "
          style={{ fontSize: "300px" }}
        />
        <p className="text-xl text-gray-700 font-bold">
          Your cart is currently empty.
        </p>
        <Link
          to="/books"
          className="mt-4 px-6 py-2 bg-blue-950 hover:text-[#dbb891] font-bold text-white rounded-md"
        >
          Return to shop
        </Link>
      </div>
    );
  }
}

export default CartPage;
