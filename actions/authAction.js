import axios from 'axios';
import {CURRENT_USER, ERRORS} from './types';
import jwt_decode from 'jwt-decode';
import {serverConfig} from '../serverConfig';

export const setCurrentUser = (decoded, token) => {
  return {
    type: CURRENT_USER,
    payload: decoded,
    token: token,
  };
};

export const loginUser = (user, spinner) => dispatch => {
  axios
    .post(`${serverConfig}login`, user)
    .then(res => {
      const {token} = res.data;
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded, token));
    })
    .then(() => {
      dispatch({
        type: ERRORS,
        payload: {},
      });
      spinner();
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: ERRORS,
          payload: err.response.data,
        });
      }
      spinner();
    });
};
