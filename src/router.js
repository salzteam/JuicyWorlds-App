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

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/login", element: <Login />, errorElement: <Error /> },
  { path: "/register", element: <Register />, errorElement: <Error /> },
  { path: "/profile", element: <Profile />, errorElement: <Error /> },
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
  { path: "/history", element: <History />, errorElement: <Error /> },
  { path: "/payment", element: <Payment />, errorElement: <Error /> },
  { path: "/search", element: <Search />, errorElement: <Error /> },
  { path: "/test", element: <Test />, errorElement: <Error /> },
]);

export default router;
