const initialState = {
  loading: true,
  error: "",
  summary: [],
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case "DASHBOARD_FETCH_REQUEST":
      return { ...state, loading: true };
    case "DASHBOARD_FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "DASHBOARD_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default dashboardReducer;
