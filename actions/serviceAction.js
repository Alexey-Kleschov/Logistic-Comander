import {SERVICE} from './types';

export const setService = service => dispatch => {
    dispatch({
        type: SERVICE,
        payload: service,
    })
};
