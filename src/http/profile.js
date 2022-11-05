import Axios from "axios";

const doGetProfile = (id, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/${id}`;
  return Axios.get(url, {
    headers: {
      "x-access-token": token,
    },
  });
};
const doUpdateProfile = (body, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/profile/edit`;
  return Axios.patch(url, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
const doUpdateUser = (body, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/profile/edit/account`;
  return Axios.patch(url, body, {
    headers: {
      "x-access-token": token,
    },
  });
};
const changePassword = (body, token) => {
  const url = `${process.env.REACT_APP_BACKEND_HOST}/api/v1/users/account`;
  return Axios.patch(url, body, {
    headers: {
      "x-access-token": token,
    },
  });
};

export { doGetProfile, doUpdateProfile, doUpdateUser, changePassword };
