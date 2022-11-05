import actionStrings from "../actions/actionStrings";
import styles from "../../styles/Product.module.css";

const initialState = {
  data: [],
  promo: [],
  id: "",
  name: "",
  price: "",
  image: "",
  desc: "",
  ctg: "",
  tglnext: styles.hide,
  tglprev: styles.hide,
  next: null,
  prev: null,
  isLoading: false,
  isError: false,
  err: null,
};

const productsReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.getProducts + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.getProductsPromo + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.getProducts + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.data.msg;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessage,
      };
    case actionStrings.getProductsPromo + actionStrings.rejected:
      const errorResponsePromo = action.payload;
      const errorMessagePromo = errorResponsePromo.data.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessagePromo,
      };
    case actionStrings.getProducts + actionStrings.fulfilled:
      const response = action.payload;
      const result = response.data.data.data;
      let toNext = styles.hide;
      let toPrev = styles.hide;
      if (response.data.data.next) toNext = styles.next;
      if (response.data.data.prev) toPrev = styles.prev;
      return {
        ...prevState,
        isLoading: false,
        data: result,
        next: response.data.data.next,
        prev: response.data.data.prev,
        tglnext: toNext,
        tglprev: toPrev,
      };
    case actionStrings.getProductsPromo + actionStrings.fulfilled:
      const responsePromo = action.payload;
      const resultPromo = responsePromo.data.data;
      return {
        ...prevState,
        isLoading: false,
        id: resultPromo.dataProduct.id,
        name: resultPromo.dataProduct.product_name,
        price: resultPromo.dataProduct.price,
        image: resultPromo.dataProduct.image,
        desc: resultPromo.dataProduct.description,
        ctg: resultPromo.dataProduct.category_name,
        promo: resultPromo.dataPromo,
      };
    default:
      return prevState;
  }
};

export default productsReducer;
