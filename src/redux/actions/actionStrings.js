import { ActionType } from "redux-promise-middleware";

const actionStrings = {
  counterUp: "COUNTER_UP",
  counterDown: "COUNTER_DOWN",
  counterReset: "COUNTER_RESET",
  getPromo: "GET_PROMO",
  getProducts: "GET_PRODUCTS",
  getAllProducts: "GET_ALLPRODUCTS",
  getProductsPromo: "GET_PRODUCTS_PROMO",
  createProduct: "CREATE_PRODUCT",
  editProduct: "EDIT_PRODUCT",
  addCart: "ADD_CART",
  addPromo: "ADD_PROMO",
  deleteProduct: "DELETE_PRODUCT",
  addPromo: "ADD_PROMO",
  doOrder: "CREATE_TRANSACTION",
  doLogin: "DO_LOGIN",
  doLogout: "DO_LOGOUT",
  forgot: "FORGET",
  register: "REGISTER",
  getProfile: "GET_PROFILE",
  updateProfile: "UPDATE_PROFILE",
  updateUser: "UPDATE_USER",
  changepwd: "CHANGE_PASSWORD",
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default actionStrings;
