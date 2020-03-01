const authActions = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  loginUserSuccess: (dispatch, user) => {
    return dispatch({
      type: authActions.LOGIN_USER_SUCCESS,
      payload: user,
    });
  },
};

export default authActions;
