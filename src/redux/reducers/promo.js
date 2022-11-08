import actionStrings from "../actions/actionStrings";

const initialState = {
  data: [],
  dataCreate: [],
  errCreate: null,
  isLoading: false,
  isError: false,
  err: null,
};

const promoReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.getPromo + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.addPromo + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.getPromo + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.response.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessage,
      };
    case actionStrings.addPromo + actionStrings.rejected:
      const errorResponseadd = action.payload;
      const errorMessageadd = errorResponseadd.response.data.message;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        errCreate: errorMessageadd,
      };
    case actionStrings.getPromo + actionStrings.fulfilled:
      const response = action.payload;
      // console.log(response);
      const result = response.data.data.data;
      return {
        ...prevState,
        isLoading: false,
        data: result,
      };
    case actionStrings.addPromo + actionStrings.fulfilled:
      const responseadd = action.payload;
      console.log(responseadd);
      const resultadd = responseadd.data.data.data;
      return {
        ...prevState,
        isLoading: false,
        dataCreate: resultadd,
      };
    default:
      return prevState;
  }
};

export default promoReducer;
