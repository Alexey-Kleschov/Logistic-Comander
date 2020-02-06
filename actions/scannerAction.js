import { SCANNER } from './types';

// export const scannerAction = payload => dispatch => {
//     dispatch({
//         type: SCANNER,
//         payload: payload
//     });
// };

export const scannerAction = payload => {
    return {
        type: SCANNER,
        payload: payload
    };
};
