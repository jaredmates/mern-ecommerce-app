const initialState = {
  loading: true,
  error: "",
  products: [],
  page: [],
  pages: [],
  countProducts: [],
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_FETCH_REQUEST":
      return { ...state, loading: true };
    case "SEARCH_FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "SEARCH_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default searchReducer;
