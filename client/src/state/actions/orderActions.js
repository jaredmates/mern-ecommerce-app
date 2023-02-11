export const orderFetchRequest = (data) => {
  return {
    type: "ORDER_FETCH_REQUEST",
    payload: data,
  };
};

export const orderFetchSuccess = (data) => {
  return {
    type: "ORDER_FETCH_SUCCESS",
    payload: data,
  };
};

export const orderFetchFail = (data) => {
  return {
    type: "ORDER_FETCH_FAIL",
    payload: data,
  };
};

export const payRequest = (data) => {
  return {
    type: "PAY_REQUEST",
    payload: data,
  };
};

export const paySuccess = (data) => {
  return {
    type: "PAY_SUCCESS",
    payload: data,
  };
};

export const payFail = (data) => {
  return {
    type: "PAY_FAIL",
    payload: data,
  };
};

export const payReset = (data) => {
  return {
    type: "PAY_RESET",
    payload: data,
  };
};

export const deliverRequest = (data) => {
  return {
    type: "DELIVER_REQUEST",
    payload: data,
  };
};

export const deliverSuccess = (data) => {
  return {
    type: "DELIVER_SUCCESS",
    payload: data,
  };
};

export const deliverFail = (data) => {
  return {
    type: "DELIVER_FAIL",
    payload: data,
  };
};

export const deliverReset = (data) => {
  return {
    type: "DELIVER_RESET",
    payload: data,
  };
};
