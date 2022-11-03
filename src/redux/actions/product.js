import actionStrings from "./actionStrings";
import {
  getProduct,
  getPromo,
  getCoffe,
  getFoods,
  getNonCoffe,
} from "../../http/product";

const getProductAction = (limit) => {
  return {
    type: actionStrings.getProducts,
    payload: getProduct(limit),
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

const productAction = {
  getProductAction,
  getPromoAction,
  getFoodsAction,
  getCoffeAction,
  getNoncoffeAction,
};

export default productAction;
