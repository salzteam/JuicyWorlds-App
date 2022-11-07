import actionStrings from "./actionStrings";
import {
  getProduct,
  getPromo,
  getCoffe,
  getFoods,
  getNonCoffe,
  getPromoProduct,
  getProductSelect,
  getAddOn,
  createProduct,
  editProduct,
  getProductAll,
} from "../../http/product";

const getProductAction = (limit) => {
  return {
    type: actionStrings.getProducts,
    payload: getProduct(limit),
  };
};
const getProductAllAction = () => {
  return {
    type: actionStrings.getAllProducts,
    payload: getProductAll(),
  };
};
const getProductSelectAction = (params, limit) => {
  return {
    type: actionStrings.getProducts,
    payload: getProductSelect(params, limit),
  };
};
const getProductNextAction = (url) => {
  return {
    type: actionStrings.getProducts,
    payload: getProduct(url),
  };
};
const getPromoAction = () => {
  return {
    type: actionStrings.getProducts,
    payload: getPromo(),
  };
};
const getFoodsAction = () => {
  return {
    type: actionStrings.getProducts,
    payload: getFoods(),
  };
};
const getCoffeAction = () => {
  return {
    type: actionStrings.getProducts,
    payload: getCoffe(),
  };
};
const getNoncoffeAction = () => {
  return {
    type: actionStrings.getProducts,
    payload: getNonCoffe(),
  };
};
const getAddOnAction = () => {
  return {
    type: actionStrings.getProducts,
    payload: getAddOn(),
  };
};
const getPromoProductAction = (id) => {
  return {
    type: actionStrings.getProductsPromo,
    payload: getPromoProduct(id),
  };
};
const createProductAction = (data, token) => {
  return {
    type: actionStrings.createProduct,
    payload: createProduct(data, token),
  };
};
const editProductAction = (data, token, id) => {
  return {
    type: actionStrings.editProduct,
    payload: editProduct(data, token, id),
  };
};

const productAction = {
  getProductAction,
  getPromoAction,
  getFoodsAction,
  getCoffeAction,
  getNoncoffeAction,
  getPromoProductAction,
  getProductNextAction,
  getAddOnAction,
  getProductSelectAction,
  createProductAction,
  editProductAction,
  getProductAllAction,
};

export default productAction;
