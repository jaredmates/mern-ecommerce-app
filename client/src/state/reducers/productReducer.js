const initialState = {
  product: [],
  loading: true,
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_FETCH_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "PRODUCT_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
