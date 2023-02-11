export const shopFetchRequest = (data) => {
  return {
    type: "SHOP_FETCH_REQUEST",
    payload: data,
  };
};

export const shopFetchSuccess = (data) => {
  return {
    type: "SHOP_FETCH_SUCCESS",
    payload: data,
  };
};

export const shopFetchFail = (data) => {
  return {
    type: "SHOP_FETCH_FAIL",
    payload: data,
  };
};
