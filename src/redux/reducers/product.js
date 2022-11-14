import actionStrings from "../actions/actionStrings";
import styles from "../../styles/Product.module.css";

const initialState = {
  data: [],
  promo: [],
  dataCreate: [],
  dataEdit: [],
  dataAll: [],
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
  delLoading: false,
  dataDel: [],
  err: null,
  errCreate: null,
  errEdit: null,
  errgetall: null,
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
    case actionStrings.createProduct + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.editProduct + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.getAllProducts + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.deleteProduct + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        delLoading: true,
        isError: false,
      };
    case actionStrings.getProducts + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.response.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        data: [],
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
    case actionStrings.createProduct + actionStrings.rejected:
      const errorResponseCreate = action.payload;
      const errorMessageCreate = errorResponseCreate.response.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        errCreate: errorMessageCreate,
      };
    case actionStrings.getAllProducts + actionStrings.rejected:
      const errs = action.payload;
      const errResponse = errs.response.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        errgetall: errResponse,
      };
    case actionStrings.editProduct + actionStrings.rejected:
      const errorResponseEdit = action.payload;
      // const errorMessageEdit = errorResponseEdit.response;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        errEdit: errorResponseEdit,
      };
    case actionStrings.deleteProduct + actionStrings.rejected:
      const errorResponsedelete = action.payload;
      console.log(errorResponsedelete);
      return {
        ...prevState,
        isError: true,
        delLoading: false,
        isLoading: false,
        errEdit: errorResponsedelete,
      };
    case actionStrings.getProducts + actionStrings.fulfilled:
      const response = action.payload;
      const result = response.data.data.data;
      // console.log(result);
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
    case actionStrings.createProduct + actionStrings.fulfilled:
      const responseCreate = action.payload;
      const resultCreate = responseCreate.data.data;
      return {
        ...prevState,
        isLoading: false,
        dataCreate: resultCreate,
      };
    case actionStrings.editProduct + actionStrings.fulfilled:
      const responseEdits = action.payload;
      const resultEdits = responseEdits.data.data;
      return {
        ...prevState,
        isLoading: false,
        dataEdit: resultEdits,
      };
    case actionStrings.getAllProducts + actionStrings.fulfilled:
      const resall = action.payload;
      const resalla = resall.data.data;
      return {
        ...prevState,
        isLoading: false,
        dataAll: resalla,
      };
    case actionStrings.deleteProduct + actionStrings.fulfilled:
      const resdelete = action.payload;
      const resdeleteall = resdelete.data.data;
      return {
        ...prevState,
        isLoading: false,
        delLoading: false,
        dataDel: resdeleteall,
      };
    default:
      return prevState;
  }
};

export default productsReducer;
