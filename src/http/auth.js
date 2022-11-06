import Axios from "axios";

const doLogin = (email, password) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
  return Axios.post(url, { email, password });
};

const doLogout = (token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
  return Axios.delete(url, { headers: { "x-access-token": token } });
};
const forgot = (data) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/auth/`;
  return Axios.delete(url, data);
};

export { doLogin, doLogout, forgot };
