import actionStrings from "../actions/actionStrings";

const initialState = {
  dataProfile: [],
  dataUser: [],
  isLoading: false,
  isError: false,
  err: null,
};

const profileReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionStrings.getProfile + actionStrings.pending:
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
    default:
      return prevState;
  }
};

export default profileReducer;
