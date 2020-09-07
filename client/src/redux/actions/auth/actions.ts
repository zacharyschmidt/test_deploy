import * as types from './types';
import { UserCreds } from '../../../types';
import { Dispatch } from 'react';
import axios from 'axios';

import { setSnackBar } from '../ui/actions';
import { setFake } from '../../fake/fakeActions';

import {
  setAuthToken,
  getLocalStorageAuthToken,
  removeAuthToken
} from '../../../utils';

const createGetProfile = () => {
  return {
    type: types.GET_PROFILE
  };
};

const createRegister = () => {
  return {
    type: types.REGITSER
  };
};

const createLogin = () => {
  return {
    type: types.LOGIN
  };
};

const registerSuccess = (data: any) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  };
};

const loginSuccess = (data: any) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  };
};

const getProfileSuccess = (data: any) => {
  return {
    type: types.GET_PROFILE_SUCCESS,
    payload: data
  };
};

const catchAuthRequestErr = (data: any) => {
  return {
    type: types.AUTH_REQUEST_FAILURE,
    payload: data
  };
};

const createLogout = () => {
  return {
    type: types.LOGOUT
  };
};

export const login = (creds: UserCreds) => (dispatch: Dispatch<any>) => {
  dispatch(createLogin());
  axios({
    method: 'POST',
    url: '/api/login',
    data: creds
  })
    .then((res) => {
      setAuthToken(res.data.token);
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      dispatch(catchAuthRequestErr(err.response.data));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const register = (creds: UserCreds) => (dispatch: Dispatch<any>) => {
  dispatch(createRegister());

  axios({
    method: 'POST',
    url: '/api/register',
    data: creds
  })
    .then((res) => {
      setAuthToken(res.data.token);
      dispatch(registerSuccess(res.data));
    })
    .catch((err) => {
      dispatch(catchAuthRequestErr(err.response.data));
      dispatch(setSnackBar({ type: 'error', msg: err.response.data.message }));
    });
};

export const getProfile = () => (dispatch: Dispatch<any>) => {
  const token = getLocalStorageAuthToken();
  if (token) {
    setAuthToken(token);
    dispatch(createGetProfile());
    axios({
      method: 'GET',
      url: '/api/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
      })
      .catch((err) => {
        dispatch(catchAuthRequestErr(err.response.data.message));
        console.error(err.response.data.message);
      });
  } else {
    dispatch(setFake());
  }
};

export const logout = () => (dispatch: Dispatch<any>) => {
  removeAuthToken();
  dispatch(createLogout());
  dispatch(setFake());
};
