const initialState = {
  loading: true,
  loadingPay: false,
  error: "",
  order: {},
  successPay: false,
  loadingDeliver: false,
  successDeliver: false,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "ORDER_FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "ORDER_FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "ORDER_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      return state;
  }
}

export default orderReducer;
