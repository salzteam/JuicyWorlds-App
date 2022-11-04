import Axios from "axios";

const doGetProfile = (id, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${id}`;
  return Axios.get(url, {
    headers: {
      "x-access-token": token,
    },
  });
};

export { doGetProfile };
