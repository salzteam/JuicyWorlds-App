import Axios from "axios";

const getPromo = () => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/promo/`;
  return Axios.get(url);
};

const addPromo = (data, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/promo/create`;
  return Axios.post(url, data, {
    headers: {
      "x-access-token": token,
    },
  });
};

export { getPromo, addPromo };
