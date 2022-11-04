import Axios from "axios";

const doRegister = (email, password, phone) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/register`;
  return Axios.post(url, { email, password, phone });
};

export { doRegister };
