export const userSignin = (data) => {
  return {
    type: "USER_SIGNIN",
    payload: data,
  };
};

export const userSignout = (data) => {
  return {
    type: "USER_SIGNOUT",
    payload: data,
  };
};
