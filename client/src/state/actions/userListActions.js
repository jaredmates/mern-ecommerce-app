export const userListFetchRequest = (data) => {
  return {
    type: "USER_LIST_FETCH_REQUEST",
    payload: data,
  };
};

export const userListFetchSuccess = (data) => {
  return {
    type: "USER_LIST_FETCH_SUCCESS",
    payload: data,
  };
};

export const userListFetchFail = (data) => {
  return {
    type: "USER_LIST_FETCH_FAIL",
    payload: data,
  };
};

export const userListDeleteRequest = (data) => {
  return {
    type: "USER_LIST_DELETE_REQUEST",
    payload: data,
  };
};

export const userListDeleteSuccess = (data) => {
  return {
    type: "USER_LIST_DELETE_SUCCESS",
    payload: data,
  };
};

export const userListDeleteFail = (data) => {
  return {
    type: "USER_LIST_DELETE_FAIL",
    payload: data,
  };
};

export const userListDeleteReset = (data) => {
  return {
    type: "USER_LIST_DELETE_RESET",
    payload: data,
  };
};
