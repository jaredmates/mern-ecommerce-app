export const orderListFetchRequest = (data) => {
  return {
    type: "ORDER_LIST_FETCH_REQUEST",
    payload: data,
  };
};

export const orderListFetchSuccess = (data) => {
  return {
    type: "ORDER_LIST_FETCH_SUCCESS",
    payload: data,
  };
};

export const orderListFetchFail = (data) => {
  return {
    type: "ORDER_LIST_FETCH_FAIL",
    payload: data,
  };
};

export const deleteRequest = (data) => {
  return {
    type: "DELETE_REQUEST",
    payload: data,
  };
};

export const deleteSuccess = (data) => {
  return {
    type: "DELETE_SUCCESS",
    payload: data,
  };
};

export const deleteFail = (data) => {
  return {
    type: "DELETE_FAIL",
    payload: data,
  };
};

export const deleteReset = (data) => {
  return {
    type: "DELETE_RESET",
    payload: data,
  };
};
