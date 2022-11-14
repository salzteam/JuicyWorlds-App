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
import Order from "./pages/Order";
import AddPromo from "./pages/AddPromo";
import AddProduct from "./pages/AddProduct";
import Error from "./pages/Error";
import Search from "./components/searchPage/pageSearch";
import Test from "./components/ModalDialog";
import PrivateRoute from "./components/PrivateRoute";
import NonLogin from "./components/NonLogin";
import EditProduct from "./pages/EditProduct";
import EditPromo from "./pages/EditPromo";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
  {
    path: "/login",
    element: (
      // <NonLogin>
      <Login />
      // </NonLogin>
    ),
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: (
      // <NonLogin>
      <Register />
      // </NonLogin>
    ),
    errorElement: <Error />,
  },
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
  {
    path: "/order",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <Order />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/promo/new",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AddPromo />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/product/new",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AddProduct />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/product/:id/edit",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <EditProduct />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/promo/:id/edit",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <EditPromo />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Error />,
  },
  { path: "/search", element: <Search />, errorElement: <Error /> },
  { path: "/test", element: <Test />, errorElement: <Error /> },
]);

export default router;
