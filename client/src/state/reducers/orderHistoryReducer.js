const initialState = {
  loading: true,
  error: "",
  orders: [],
};

function orderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case "ORDER_HISTORY_FETCH_REQUEST":
      return { ...state, loading: true };
    case "ORDER_HISTORY_FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "ORDER_HISTORY_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default orderHistoryReducer;
