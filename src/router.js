import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Forgot from "./pages/Forgot";
import ProductDetails from "./pages/productDetails";
import History from "./pages/History";
import Payment from "./pages/Payment";
import Error from "./pages/Error";
import Search from "./components/searchPage/pageSearch";
import Test from "./components/ModalDialog";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Register />, errorElement: <Error /> },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  { path: "/product", element: <Product />, errorElement: <Error /> },
  { path: "/forgot-password", element: <Forgot />, errorElement: <Error /> },
  {
    path: "/product-details",
    element: <ProductDetails />,
    errorElement: <Error />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails />,
    errorElement: <Error />,
  },
  {
    path: "/history",
    element: (
      <PrivateRoute>
        <History />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        <Payment />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  { path: "/search", element: <Search />, errorElement: <Error /> },
  { path: "/test", element: <Test />, errorElement: <Error /> },
]);

export default router;
