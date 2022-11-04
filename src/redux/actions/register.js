import actionStrings from "./actionStrings";
import { doRegister } from "../../http/register";

export const doRegisterAction = (email, password, phone) => {
  return {
    type: actionStrings.register,
    payload: doRegister(email, password, phone),
  };
};
