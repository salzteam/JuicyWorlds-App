import actionStrings from "./actionStrings";
import { doLogin, doLogout, forgot } from "../../http/auth";

export const doLoginAction = (email, password) => {
  return {
    type: actionStrings.doLogin,
    payload: doLogin(email, password),
  };
};

export const doLogoutAction = (data, token) => {
  return {
    type: actionStrings.doLogout,
    payload: doLogout(data, token),
  };
};
export const forgotAction = (data) => {
  return {
    type: actionStrings.forgot,
    payload: forgot(data),
  };
};
