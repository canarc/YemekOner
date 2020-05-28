import Axios from 'axios';
import {AxiosPost} from '../../helper/AxiosHelper';
import {Actions} from 'react-native-router-flux';
import {API_ADDRESS} from '../../common/constants';

const authActions = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAIL: 'LOGIN_USER_FAIL',
  REGISTER_USER_FAIL: 'REGISTER_USER_FAIL',

  register: (email, password, birth_date, city) => {
    let user = {email, password, birth_date, city};

    return dispatch => {
      AxiosPost('account', user)
        .then(res => {
          if (res.data.code == 201) {
            dispatch(authActions.login(email, password));
          } else {
            authActions.registerUserFail(dispatch, res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
  },

  login: (email, password) => {
    let user = {email, password};
    return dispatch => {
      AxiosPost('account/validate', user)
        .then(res => {
          if (res.data.code === 200) {
            authActions.loginUserSuccess(dispatch, res.data);
            if (res.data.data.is_first_login) {
              Actions.firstLoginScreen();
            } else {
              Actions.tabRouter();
            }
          } else {
            authActions.loginUserFail(dispatch, res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
  },

  registerUserFail: dispatch => {
    return dispatch({
      type: authActions.REGISTER_USER_FAIL,
    });
  },

  registerUserSuccess: (dispatch, user) => {
    return dispatch({
      type: authActions.REGISTER_USER_SUCCESS,
      payload: user,
    });
  },

  loginUserFail: (dispatch, error) => {
    return dispatch({
      type: authActions.LOGIN_USER_FAIL,
      payload: error,
    });
  },

  loginUserSuccess: (dispatch, user) => {
    return dispatch({
      type: authActions.LOGIN_USER_SUCCESS,
      payload: user,
    });
  },
};

export default authActions;
