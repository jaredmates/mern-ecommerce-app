export const userEditFetchRequest = (data) => {
  return {
    type: "USER_EDIT_FETCH_REQUEST",
    payload: data,
  };
};

export const userEditFetchSuccess = (data) => {
  return {
    type: "USER_EDIT_FETCH_SUCCESS",
    payload: data,
  };
};

export const userEditFetchFail = (data) => {
  return {
    type: "USER_EDIT_FETCH_FAIL",
    payload: data,
  };
};

export const userEditUpdateRequest = (data) => {
  return {
    type: "USER_EDIT_UPDATE_REQUEST",
    payload: data,
  };
};

export const userEditUpdateSuccess = (data) => {
  return {
    type: "USER_EDIT_UPDATE_SUCCESS",
    payload: data,
  };
};

export const userEditUpdateFail = (data) => {
  return {
    type: "USER_EDIT_UPDATE_FAIL",
    payload: data,
  };
};
