const initialState = {
  products: [],
  loading: true,
  error: "",
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOP_FETCH_REQUEST":
      return { ...state, loading: true };
    case "SHOP_FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "SHOP_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
