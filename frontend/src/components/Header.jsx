import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import { useFavorites } from "../context/FavoritesContext";
import useCartContext from "../hooks/use-cart-context";

function Header() {
  const { userInfo, logout, setIsLoggedIn, setIsLoading, setUserInfo } =
    useContext(UserContext);
  const username = userInfo?.username;
  const userImage = userInfo?.image;
  const [isError, setIsError] = useState(false);
  const { favoriteBooks } = useFavorites();
  const { cartItems } = useCartContext();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user") || "{}");

    if (Object.keys(userData).length === 0) {
      userData = null;
    }

    if (Boolean(userData) == true) {
      setUserInfo(userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    if (logout()) {
      logout();
    }
  };
  return (
    <div style={{ backgroundColor: "#172554" }} className="">
      <div className="navbar text-[#fcf6e6] container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#172554] rounded-box z-40 mt-3 w-80 p-2 shadow gap-4"
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                      : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                  }
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                      : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                  }
                  to={"/books"}
                >
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                      : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                  }
                  to={"/authors"}
                >
                  Authors
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                      : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                  }
                  to={"/about"}
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink className="bg-inherit text-xl ms-7" to={"/"}>
            <img
              src="/logo-removebg.svg"
              width={"70"}
              alt="Logo"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-10 menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                    : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                }
                style={{ transition: "0.3s ease" }}
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                    : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                }
                style={{ transition: "0.3s ease" }}
                to={"/books"}
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                    : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                }
                style={{ transition: "0.3s ease" }}
                to={"/authors"}
              >
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-xl text-[#dbb891] focus:text-[#dbb891]"
                    : "font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                }
                style={{ transition: "0.3s ease" }}
                to={"/about"}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end font-bold text-xl flex items-center gap-4">
          {localStorage.getItem("token") ? (
            <>
              <NavLink
                to={"/favorite"}
                className="relative flex items-center me-4"
              >
                <FaRegHeart className="text-2xl transition-colors duration-300" />
                {favoriteBooks.length > 0 && (
                  <span className="absolute -top-1 -right-3 bg-[#dbb891] text-black text-sm rounded-full px-2">
                    {favoriteBooks.length}
                  </span>
                )}
              </NavLink>
              <NavLink to={"/cart"} className="relative me-4 flex items-center">
                <GrShop className="text-2xl transition-colors duration-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-3 bg-[#dbb891] text-black text-sm rounded-full px-2">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </>
          ) : null}
          <ul className="flex gap-8 items-center">
            {!username && (
              <>
                <li>
                  <NavLink
                    className="font-bold text-xl hover:text-[#dbb891] hover:bg-transparent text-[#fcf6e6]"
                    style={{ transition: "0.3s ease" }}
                    to={"/login"}
                  >
                    Log in
                  </NavLink>
                </li>
                <div
                  className="dropdown dropdown-end"
                  tabIndex={0}
                  role="button"
                >
                  <li className="font-serif text-xl w-15 h-12 flex rounded-full avatar">
                    <NavLink to={"/login"}></NavLink>
                  </li>
                </div>
              </>
            )}
            {username && (
              <>
                {userImage ? (
                  <div
                    className="dropdown dropdown-end"
                    tabIndex={0}
                    role="button"
                  >
                    {!isError ? (
                      <li className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden outline shadow-lg bg-white">
                        <img
                          src={userImage}
                          alt={username}
                          className="w-full h-full object-cover"
                          onError={() => setIsError(true)}
                          // style={{ filter: "invert(1) brightness(2)" }}
                        />
                      </li>
                    ) : (
                      <li className="font-serif text-xl w-12 h-12 flex items-center justify-center rounded-full outline shadow-lg bg-white text-black px-3 avatar">
                        {username.slice(0, 1).toUpperCase()}
                      </li>
                    )}

                    <ul
                      tabIndex={0}
                      className="menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#172554]"
                    >
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <NavLink to="/library">Library</NavLink>
                      </li>
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div
                    className="dropdown dropdown-end"
                    tabIndex={0}
                    role="button"
                  >
                    <li className="font-serif text-xl w-12 h-12 flex items-center justify-center rounded-full outline shadow-lg bg-white text-black px-3 avatar">
                      {username.slice(0, 1).toUpperCase()}
                    </li>
                    <ul
                      tabIndex={0}
                      className="menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#172554]"
                    >
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <NavLink to="/library">Library</NavLink>
                      </li>
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                      <li className="font-bold text-xl hover:text-[#dbb891]">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
