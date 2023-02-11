export const orderHistoryFetchRequest = (data) => {
  return {
    type: "ORDER_HISTORY_FETCH_REQUEST",
    payload: data,
  };
};

export const orderHistoryFetchSuccess = (data) => {
  return {
    type: "ORDER_HISTORY_FETCH_SUCCESS",
    payload: data,
  };
};

export const orderHistoryFetchFail = (data) => {
  return {
    type: "ORDER_HISTORY_FETCH_FAIL",
    payload: data,
  };
};
