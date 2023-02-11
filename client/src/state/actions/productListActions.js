export const productListFetchRequest = (data) => {
  return {
    type: "PRODUCT_LIST_FETCH_REQUEST",
    payload: data,
  };
};

export const productListFetchSuccess = (data) => {
  return {
    type: "PRODUCT_LIST_FETCH_SUCCESS",
    payload: data,
  };
};

export const productListFetchFail = (data) => {
  return {
    type: "PRODUCT_LIST_FETCH_FAIL",
    payload: data,
  };
};

export const productListCreateRequest = (data) => {
  return {
    type: "PRODUCT_LIST_CREATE_REQUEST",
    payload: data,
  };
};

export const productListCreateSuccess = (data) => {
  return {
    type: "PRODUCT_LIST_CREATE_SUCCESS",
    payload: data,
  };
};

export const productListCreateFail = (data) => {
  return {
    type: "PRODUCT_LIST_CREATE_FAIL",
    payload: data,
  };
};

export const productListDeleteRequest = (data) => {
  return {
    type: "PRODUCT_LIST_DELETE_REQUEST",
    payload: data,
  };
};

export const productListDeleteSuccess = (data) => {
  return {
    type: "PRODUCT_LIST_DELETE_SUCCESS",
    payload: data,
  };
};

export const productListDeleteFail = (data) => {
  return {
    type: "PRODUCT_LIST_DELETE_FAIL",
    payload: data,
  };
};

export const productListDeleteReset = (data) => {
  return {
    type: "PRODUCT_LIST_DELETE_RESET",
    payload: data,
  };
};
