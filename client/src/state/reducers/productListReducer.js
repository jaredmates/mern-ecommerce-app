const initialState = {
  loading: true,
  error: "",
  products: [],
  page: [],
  pages: [],
  loadingCreate: false,
  loadingDelete: false,
  successDelete: false,
};

function productListReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_LIST_FETCH_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_LIST_FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "PRODUCT_LIST_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCT_LIST_CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "PRODUCT_LIST_CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "PRODUCT_LIST_CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "PRODUCT_LIST_DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "PRODUCT_LIST_DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "PRODUCT_LIST_DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "PRODUCT_LIST_DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
}

export default productListReducer;
