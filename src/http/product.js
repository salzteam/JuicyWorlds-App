import Axios from "axios";

const getProduct = (limit) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?transactions=popular&${limit}`;
  return Axios.get(url);
};
const getProductSelect = (params, limit) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?${params}&${limit}`;
  return Axios.get(url);
};
const getProductNext = (url) => {
  return Axios.get(url);
};
const getPromo = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/promo`;
  return Axios.get(url);
};
const getCoffe = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=coffee`;
  return Axios.get(url);
};
const getFoods = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=foods`;
  return Axios.get(url);
};
const getNonCoffe = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=non%20coffee`;
  return Axios.get(url);
};
const getAddOn = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products?filter=addon`;
  return Axios.get(url);
};
const getPromoProduct = (id) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/products/${id}`;
  return Axios.get(url);
};

export {
  getProduct,
  getPromo,
  getCoffe,
  getNonCoffe,
  getFoods,
  getPromoProduct,
  getProductNext,
  getAddOn,
  getProductSelect,
};
