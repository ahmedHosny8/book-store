import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ProfilePage from "./pages/profile/ProfilePage";
import { profileLoader } from "./pages/profile/profileLoader";
import { profileAction } from "./pages/profile/profileAction";
import AboutPage from "./pages/AboutPage";
import NotFound from "./NotFound";
import AddFovrit from "./pages/AddFovrit";
import CartPage from "./pages/CartPage";
import { FavoritesProvider } from "./context/FavoritesContext"; // Import the context provider
import { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout";

//import UseOrder from "./hooks/UseOrder";

import OrderPage from "./pages/OrderPage";
import LibraryPage from "./pages/LibraryPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import LoginRoute from "./utils/LoginRoute";
import PrivateRoute from "./utils/privateRouter";

function createAppRouter() {
  // const {orders,setIsNewOrderAdded}=UseOrder()
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/books",
          element: <BooksPage />,
        },
        {
          path: "/favorite",
          element: (
            <PrivateRoute>
              <AddFovrit />
            </PrivateRoute>
          ),
        },
        {
          path: "/books/:id",
          element: <DetailsPage />,
        },
        {
          path: "/login",
          element: (
            <LoginRoute>
              <Login />
            </LoginRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          ),
          loader: profileLoader,
          action: profileAction,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/signup",

          element: (
            <LoginRoute>
              <Registration />
            </LoginRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/cart",
          element: (<PrivateRoute><CartPage /></PrivateRoute>),
        },
        {
          path: "/orders",
          element: (<PrivateRoute><OrderPage /></PrivateRoute>),
        },
        {
          path: "/library",
          element:( <PrivateRoute><LibraryPage /></PrivateRoute>),
        },
        {
          path: "/authors",
          element: <AuthorsPage />,
        },
        {
          path: "/authors/:id",
          element: <AuthorDetailsPage />,
        },
        {
          path: "/checkout-success",
          element: <LibraryPage />,
        },

        {
          path: "/checkout-cancel",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
  ]);
}

function App() {
  const router = createAppRouter();

  return (
    <>
      <Toaster />

      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </>
  );
}

export default App;
