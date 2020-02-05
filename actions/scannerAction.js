import { SCANNER } from './types';

export const scannerAction = payload => {
    return {
        type: SCANNER,
        payload: payload
    };
};