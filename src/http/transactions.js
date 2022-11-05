import Axios from "axios";

const createTransaction = (data, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`;
  return Axios.post(url, data, {
    headers: {
      "x-access-token": token,
    },
  });
};

const pendingTransaction = (data, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`;
  return Axios.post(url, data, {
    headers: {
      "x-access-token": token,
    },
  });
};

const paidTransaction = (data, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/transactions/create`;
  return Axios.post(url, data, {
    headers: {
      "x-access-token": token,
    },
  });
};

export { createTransaction, paidTransaction };
