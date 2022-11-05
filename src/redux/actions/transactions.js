import actionStrings from "./actionStrings";
import { createTransaction } from "../../http/transactions";

export const createTransactionAction = (body, token) => {
  return {
    type: actionStrings.doOrder,
    payload: createTransaction(body, token),
  };
};
