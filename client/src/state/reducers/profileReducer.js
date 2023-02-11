const initialState = {
  loadingUpdate: false,
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "PROFILE_UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "PROFILE_UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "PROFILE_UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
}

export default profileReducer;
