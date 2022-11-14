import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import rpm from "redux-promise-middleware";
import logger from "redux-logger";
import productsReducer from "./reducers/product";
import authReducer from "./reducers/auth";
import registerReducer from "./reducers/register";
import profileReducer from "./reducers/profile";
import transactionReducer from "./reducers/transactions";
import promoReducer from "./reducers/promo";
import cartReducer from "./reducers/counter";
import addPromoReducer from "./reducers/addpromo";

const middleware = applyMiddleware(rpm);
const reducers = combineReducers({
  products: productsReducer,
  auth: authReducer,
  regist: registerReducer,
  profile: profileReducer,
  promo: promoReducer,
  transaction: transactionReducer,
  cart: cartReducer,
  addPromo: addPromoReducer,
});
const store = createStore(reducers, middleware);

export default store;
