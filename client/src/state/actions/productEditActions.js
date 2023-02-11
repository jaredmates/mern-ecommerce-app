export const productEditFetchRequest = (data) => {
  return {
    type: "PRODUCT_EDIT_FETCH_REQUEST",
    payload: data,
  };
};

export const productEditFetchSuccess = (data) => {
  return {
    type: "PRODUCT_EDIT_FETCH_SUCCESS",
    payload: data,
  };
};

export const productEditFetchFail = (data) => {
  return {
    type: "PRODUCT_EDIT_FETCH_FAIL",
    payload: data,
  };
};

export const updateRequest = (data) => {
  return {
    type: "UPDATE_REQUEST",
    payload: data,
  };
};

export const updateSuccess = (data) => {
  return {
    type: "UPDATE_SUCCESS",
    payload: data,
  };
};

export const updateFail = (data) => {
  return {
    type: "UPDATE_FAIL",
    payload: data,
  };
};

export const uploadRequest = (data) => {
  return {
    type: "UPLOAD_REQUEST",
    payload: data,
  };
};

export const uploadSuccess = (data) => {
  return {
    type: "UPLOAD_SUCCESS",
    payload: data,
  };
};

export const uploadFail = (data) => {
  return {
    type: "UPLOAD_FAIL",
    payload: data,
  };
};
