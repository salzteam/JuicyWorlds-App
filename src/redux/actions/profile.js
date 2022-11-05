import actionStrings from "./actionStrings";
import {
  doGetProfile,
  doUpdateProfile,
  doUpdateUser,
  changePassword,
} from "../../http/profile";

export const doProfileAction = (id, token) => {
  return {
    type: actionStrings.getProfile,
    payload: doGetProfile(id, token.token),
  };
};

export const doUpdateProfileAction = (body, token) => {
  return {
    type: actionStrings.updateProfile,
    payload: doUpdateProfile(body, token),
  };
};
export const doUpdateUserAction = (body, token) => {
  return {
    type: actionStrings.updateUser,
    payload: doUpdateUser(body, token),
  };
};
export const changepwdAction = (body, token) => {
  return {
    type: actionStrings.changepwd,
    payload: changePassword(body, token.token),
  };
};
