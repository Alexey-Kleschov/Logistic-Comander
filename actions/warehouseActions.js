import axios from 'axios';
import {ERRORS, CURRENT_WAREHOUSE} from './types';
import {serverConfig} from '../serverConfig';

export const getWarehouse = (license, token, nextPage, spinner) => dispatch => {
  let config = {
    headers: {
      Authorization: token,
    },
  };
  axios
    .get(`${serverConfig}warehouses/${license}`, config)
    .then(res => {
      dispatch({
        type: CURRENT_WAREHOUSE,
        payload: res.data,
      });
      nextPage();
    })
    .then(() => {
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: ERRORS,
          payload: err.response.data,
        });
        spinner();
      }
    });
};
