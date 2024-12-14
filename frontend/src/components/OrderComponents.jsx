import { Link, useNavigate } from "react-router-dom";
import useCartContext from "../hooks/use-cart-context";

export default function OrderComponents({
  calculateTotalPrice,
  calculateOriginalPrice,
  calculateTotalSavings,
  calculateTax,
  isLoading,
}) {
  const { getUserCartItems, cartItems } = useCartContext();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate("/checkout"); // Navigate to checkout page
  };

  return cartItems.length > 0 ? (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-gray-900 ">Order summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900 ">
              {calculateOriginalPrice().toFixed(1)} EGP
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Savings</dt>
            <dd className="text-base font-medium text-green-600">
              -{calculateTotalSavings().toFixed(1)} EGP
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Tax</dt>
            <dd className="text-base font-medium text-gray-900 ">
              {calculateTax().toFixed(1)} EGP
            </dd>
          </dl>
        </div>
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
          <dt className="text-base font-bold text-gray-900 ">Total</dt>
          <dd className="text-base font-bold text-gray-900 ">
            {calculateTotalPrice().toFixed(1)} EGP
          </dd>
        </dl>
      </div>

      <button
        className="btn bg-blue-950 hover:bg-blue-950 hover:text-[#dbb891] text-white rounded-md w-full"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-500"> or </span>
        <Link
          to={"/books"}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:underline no-underline"
        >
          Discover More
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center m-5">
      <p className="text-xl">No order Found </p>
    </div>
  );
}
