export const productFetchRequest = (data) => {
  return {
    type: "PRODUCT_FETCH_REQUEST",
    payload: data,
  };
};

export const productFetchSuccess = (data) => {
  return {
    type: "PRODUCT_FETCH_SUCCESS",
    payload: data,
  };
};

export const productFetchFail = (data) => {
  return {
    type: "PRODUCT_FETCH_FAIL",
    payload: data,
  };
};
