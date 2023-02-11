export const dashboardFetchRequest = (data) => {
  return {
    type: "DASHBOARD_FETCH_REQUEST",
    payload: data,
  };
};

export const dashboardFetchSuccess = (data) => {
  return {
    type: "DASHBOARD_FETCH_SUCCESS",
    payload: data,
  };
};

export const dashboardFetchFail = (data) => {
  return {
    type: "DASHBOARD_FETCH_FAIL",
    payload: data,
  };
};
