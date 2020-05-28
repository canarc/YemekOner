import authActions from '../actions/AuthActions';

const initialState = {
  user: {},
};

export const authReducer = function(state = initialState, action) {
  switch (action.type) {
    case authActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case authActions.LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case authActions.REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
