import actionStrings from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  err: null,
  data: null,
  token: null,
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.doLogin + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.doLogout + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.doLogin + actionStrings.rejected:
      const errorResponseLogin = action.payload;
      const errorMessageLogin = errorResponseLogin;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessageLogin.response.data.message,
      };
    case actionStrings.doLogout + actionStrings.rejected:
      const errorResponseLogout = action.payload;
      const errorMessageLogout = errorResponseLogout;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessageLogout.response.data.message,
      };
    case actionStrings.doLogin + actionStrings.fulfilled:
      const responseLogin = action.payload;
      const resultLogin = responseLogin.data.data;
      localStorage.setItem("userInfo", JSON.stringify(resultLogin));
      return {
        ...prevState,
        isLoading: false,
        data: resultLogin,
        token: resultLogin.token,
      };
    case actionStrings.doLogout + actionStrings.fulfilled:
      localStorage.removeItem("userInfo");
      return {
        ...prevState,
        isLoading: false,
        data: null,
        token: null,
      };
    default:
      return prevState;
  }
};

export default authReducer;
