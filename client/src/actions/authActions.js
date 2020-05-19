import Axios from 'axios';

import {returnErrors} from './errAction';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch ({type: USER_LOADING});

  Axios.get ('/api/auth/user', tokenConfig (getState))
    .then (res =>
      dispatch ({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch (err => {
      dispatch (returnErrors (err.response.data, err.response.status));
      dispatch ({
        type: AUTH_ERROR,
      });
    });
};

// logout User

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// login a user

export const login = ({email, password}) => dispatch => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // request body

  const body = JSON.stringify ({email, password});
  Axios.post ('/api/auth', body, config)
    .then (res =>
      dispatch ({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch (err => {
      dispatch (
        returnErrors (err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch ({
        type: LOGIN_FAIL,
      });
    });
};

// Register user
export const register = ({name, email, password}) => dispatch => {
  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // request body

  const body = JSON.stringify ({name, email, password});
  Axios.post ('/api/users', body, config)
    .then (res =>
      dispatch ({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch (err => {
      dispatch (
        returnErrors (err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch ({
        type: REGISTER_FAIL,
      });
    });
};

//setup config/headers & token

export const tokenConfig = getState => {
  //get token from local storage
  const token = getState ().auth.token;

  //headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // if token then add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
