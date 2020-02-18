import axios from 'axios';
import {CURRENT_USER, ERRORS, SERVICE} from './types';
import jwt_decode from 'jwt-decode';
import { warehouseConfig, cargoConfig } from '../serverConfig';

export const setCurrentUser = (decoded, token) => {
    return {
        type: CURRENT_USER,
        payload: decoded,
        token: token,
    };
};

export const loginUser = (user, spinner, service = '') => dispatch => {
    const URL = !service ? warehouseConfig : cargoConfig;
    axios
        .post(`${URL}login`, user)
        .then(res => {
            const {token} = res.data;
            console.log(token);
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

export const logoutUser = () => dispatch => {
    dispatch(setCurrentUser({}))
    dispatch({
        type: ERRORS,
        payload: {}
    })
}
