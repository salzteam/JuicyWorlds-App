import actionStrings from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  err: null,
  data: null,
};

const transactionReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.doOrder + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.doOrder + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.response.data.msg;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessage,
      };
    case actionStrings.doOrder + actionStrings.fulfilled:
      const responseLogin = action.payload;
      const resultLogin = responseLogin.data.data;
      console.log(responseLogin);
      console.log(resultLogin);
      return {
        ...prevState,
        isLoading: false,
        data: resultLogin,
      };
    default:
      return prevState;
  }
};

export default transactionReducer;
