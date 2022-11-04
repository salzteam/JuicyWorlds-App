import actionStrings from "./actionStrings";
import { doLogin, doLogout } from "../../http/auth";

export const doLoginAction = (email, password) => {
  return {
    type: actionStrings.doLogin,
    payload: doLogin(email, password),
  };
};

export const doLogoutAction = (token) => {
  return {
    type: actionStrings.doLogout,
    payload: doLogout(token),
  };
};
