export const profileUpdateRequest = (data) => {
  return {
    type: "PROFILE_UPDATE_REQUEST",
    payload: data,
  };
};

export const profileUpdateSuccess = (data) => {
  return {
    type: "PROFILE_UPDATE_SUCCESS",
    payload: data,
  };
};

export const profileUpdateFail = (data) => {
  return {
    type: "PROFILE_UPDATE_FAIL",
    payload: data,
  };
};
