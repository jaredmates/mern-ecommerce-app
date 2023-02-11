export const createRequest = (data) => {
  return {
    type: "CREATE_REQUEST",
    payload: data,
  };
};

export const createSuccess = (data) => {
  return {
    type: "CREATE_SUCCESS",
    payload: data,
  };
};

export const createFail = (data) => {
  return {
    type: "CREATE_FAIL",
    payload: data,
  };
};
