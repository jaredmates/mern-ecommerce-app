export const searchFetchRequest = (data) => {
  return {
    type: "SEARCH_FETCH_REQUEST",
    payload: data,
  };
};

export const searchFetchSuccess = (data) => {
  return {
    type: "SEARCH_FETCH_SUCCESS",
    payload: data,
  };
};

export const searchFetchFail = (data) => {
  return {
    type: "SEARCH_FETCH_FAIL",
    payload: data,
  };
};
