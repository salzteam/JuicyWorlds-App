import actionStrings from "../actions/actionStrings";

const initialState = {
  data: [],
  dataProfile: [],
  dataUser: [],
  isLoading: false,
  isError: false,
  err: null,
  errPwd: null,
  resPwd: "",
  email: null,
  phone: null,
};

const profileReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.getProfile + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.updateProfile + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.updateUser + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.changepwd + actionStrings.pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case actionStrings.getProfile + actionStrings.rejected:
      const errorResponse = action.payload;
      const errorMessage = errorResponse.data;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessage,
      };
    case actionStrings.updateProfile + actionStrings.rejected:
      const errorResponseUpdate = action.payload;
      const errorMessageUpdate = errorResponseUpdate.response.data.msg;
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessageUpdate,
      };
    case actionStrings.changepwd + actionStrings.rejected:
      const resErr = action.payload;
      const errPwds = resErr.response.data.message;
      console.log(resErr);
      console.log(errPwds);
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        errPwd: errPwds,
      };
    case actionStrings.updateUser + actionStrings.rejected:
      const errorResponseUpdateUser = action.payload;
      const errorMessageUpdateUser =
        errorResponseUpdateUser.response.data.message;
      let phoneerr = null;
      let emailerr = null;
      if (errorMessageUpdateUser === "*email already exists*") {
        emailerr = "*email already exists*";
      }
      if (errorMessageUpdateUser === "*phone already exists*") {
        phoneerr = "*phone already exists*";
      }
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        err: errorMessageUpdateUser,
        phone: phoneerr,
        email: emailerr,
      };
    case actionStrings.getProfile + actionStrings.fulfilled:
      const response = action.payload;
      const resultProfile = response.data.data.profileData;
      const resultUser = response.data.data.profileUser;
      return {
        ...prevState,
        isLoading: false,
        dataUser: resultProfile,
        dataProfile: resultUser,
      };
    case actionStrings.updateProfile + actionStrings.fulfilled:
      const responses = action.payload;
      const result = responses.data.data;
      return {
        ...prevState,
        isLoading: false,
        data: result,
      };
    case actionStrings.updateUser + actionStrings.fulfilled:
      const responsesUser = action.payload;
      const results = responsesUser.data.data;
      return {
        ...prevState,
        isLoading: false,
        data: results,
      };
    case actionStrings.changepwd + actionStrings.fulfilled:
      const responsepwd = action.payload;
      const resultspwd = responsepwd.data.message;
      console.log(responsepwd);
      console.log(resultspwd);
      return {
        ...prevState,
        isLoading: false,
        resPwd: "Password HasBeen Change",
      };
    default:
      return prevState;
  }
};

export default profileReducer;
