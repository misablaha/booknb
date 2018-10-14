
const initialState = {
  fetching: false,
  error: null,
};

const createMetadataReducer = (request, success, failure) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case request :
        return {
          fetching: true,
          error: null,
        };
      case success :
        return {
          fetching: false,
          error: null,
        };
      case failure :
        return {
          fetching: false,
          error: action.error,
        };
      default :
        return state;
    }
  };
};

export default createMetadataReducer;
