import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import rpm from "redux-promise-middleware";
import productsReducer from "./reducers/product";

const middleware = applyMiddleware(rpm);
const reducers = combineReducers({
  products: productsReducer,
});
const store = createStore(reducers, middleware);

export default store;
