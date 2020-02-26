import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {CURRENT_USER, ERRORS, SERVICE} from './types';
import jwt_decode from 'jwt-decode';
import { warehouseConfig, cargoConfig } from '../serverConfig';
import SecurityRoute from '../src/routing/SecurityRoute';

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
        .then(async res => {
            const {token} = res.data;
            const decoded = jwt_decode(token);
            let role;
            role = await AsyncStorage.getItem('role');
            console.log('LOGIN before', role);                      
            await AsyncStorage.setItem('role', decoded.role);
            role = await AsyncStorage.getItem('role');
            console.log('LOGIN after', role);                        
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

export const logoutUser = () => async dispatch => {
    await AsyncStorage.setItem('role', '');
    dispatch(setCurrentUser({}))
    dispatch({
        type: ERRORS,
        payload: {}
    });
}
