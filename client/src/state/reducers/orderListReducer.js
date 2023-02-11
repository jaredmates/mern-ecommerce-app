const initialState = {
  loading: true,
  error: "",
  orders: [],
  loadingDelete: false,
  successDelete: false,
};

function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case "ORDER_LIST_FETCH_REQUEST":
      return { ...state, loading: true };
    case "ORDER_LIST_FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "ORDER_LIST_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
}

export default orderListReducer;
