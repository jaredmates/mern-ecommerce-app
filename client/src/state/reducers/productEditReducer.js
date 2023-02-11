const initialState = {
  loading: true,
  error: "",
  loadingUpdate: false,
  errorUpload: "",
};

function productEditReducer(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_EDIT_FETCH_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_EDIT_FETCH_SUCCESS":
      return { ...state, loading: false };
    case "PRODUCT_EDIT_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

export default productEditReducer;
