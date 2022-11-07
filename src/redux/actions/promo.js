import actionStrings from "./actionStrings";
import { addPromo, getPromo } from "../../http/promo";

export const promoAction = () => {
  return {
    type: actionStrings.getPromo,
    payload: getPromo(),
  };
};

export const addpromoAction = () => {
  return {
    type: actionStrings.addPromo,
    payload: addPromo(),
  };
};
