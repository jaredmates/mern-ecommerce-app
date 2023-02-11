const initialState = {
  loading: true,
  error: "",
  users: [],
  loadingDelete: false,
  successDelete: false,
};

function userListReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LIST_FETCH_REQUEST":
      return { ...state, loading: true };
    case "USER_LIST_FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "USER_LIST_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LIST_DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "USER_LIST_DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "USER_LIST_DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "USER_LIST_DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
}

export default userListReducer;
