import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Root() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/" ||
    location.pathname.includes("/books") ||
    location.pathname.includes("/details") ||
    location.pathname.includes("/cart") ||
    location.pathname.includes("/favorite") ||
    location.pathname.includes("/orders") ||
    location.pathname.includes("/library") ||
    location.pathname.includes("/checkout") ||
    location.pathname.includes("/profile") ||
    location.pathname.includes("/about") ||
    location.pathname.includes("/authors");

  return (
    <div className="flex flex-col min-h-screen">
      {hideHeader && <Header className="sticky top-0 z-50" />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {hideHeader && <Footer className="mt-auto" />}
    </div>
  );
}

export default Root;
