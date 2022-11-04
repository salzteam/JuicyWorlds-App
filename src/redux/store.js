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

const middleware = applyMiddleware(rpm, logger);
const reducers = combineReducers({
  products: productsReducer,
  auth: authReducer,
  regist: registerReducer,
  profile: profileReducer,
});
const store = createStore(reducers, middleware);

export default store;
