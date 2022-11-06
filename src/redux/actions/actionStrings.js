import { ActionType } from "redux-promise-middleware";

const actionStrings = {
  counterUp: "COUNTER_UP",
  counterDown: "COUNTER_DOWN",
  counterReset: "COUNTER_RESET",
  getProducts: "GET_PRODUCTS",
  getProductsPromo: "GET_PRODUCTS_PROMO",
  createProduct: "CREATE_PRODUCT",
  editProduct: "EDIT_PRODUCT",
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
