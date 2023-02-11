const initialState = {
  loading: true,
  error: "",
  loadingUpdate: false,
};

function userEditReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_EDIT_FETCH_REQUEST":
      return { ...state, loading: true };
    case "USER_EDIT_FETCH_SUCCESS":
      return { ...state, loading: false };
    case "USER_EDIT_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_EDIT_UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "USER_EDIT_UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "USER_EDIT_UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
}

export default userEditReducer;
