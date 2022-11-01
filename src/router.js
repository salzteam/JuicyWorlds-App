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
import Test from "./components/Navbarlogout";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/product", element: <Product /> },
  { path: "/forgot-password", element: <Forgot /> },
  { path: "/product-details", element: <ProductDetails /> },
  { path: "/product-details/:id", element: <ProductDetails /> },
  { path: "/history", element: <History /> },
  { path: "/payment", element: <Payment /> },
  { path: "/search", element: <Search /> },
  { path: "/test", element: <Test /> },
]);

export default router;
