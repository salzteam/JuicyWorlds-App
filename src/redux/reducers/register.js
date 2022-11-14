import actionStrings from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  err: null,
  data: null,
};

const registerReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.register + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        err: null,
      };
    case actionStrings.register + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.response.data.msg;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessage,
      };
    case actionStrings.register + actionStrings.fulfilled:
      const responseLogin = action.payload;
      const resultLogin = responseLogin.data.data;
      return {
        ...prevState,
        isLoading: false,
        data: resultLogin,
      };
    default:
      return prevState;
  }
};

export default registerReducer;
