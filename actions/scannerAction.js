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
<<<<<<< HEAD
    };
};
=======
    });
};

export const scannerResetAction = () => dispatch => {
    dispatch({
        type: SCANNER,
        payload: null
    });
};
>>>>>>> ee7775bc6c3e1e59c5ceefd791c83da871a89322
