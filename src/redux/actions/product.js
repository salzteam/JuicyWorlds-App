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
} from "../../http/product";

const getProductAction = (limit) => {
  return {
    type: actionStrings.getProducts,
    payload: getProduct(limit),
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
};

export default productAction;
