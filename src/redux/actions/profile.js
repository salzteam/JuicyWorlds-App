import actionStrings from "./actionStrings";
import { doGetProfile } from "../../http/profile";

export const doProfileAction = (id, token) => {
  return {
    type: actionStrings.getProfile,
    payload: doGetProfile(id, token.token),
  };
};
