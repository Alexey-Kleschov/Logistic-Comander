import { SCANNER } from '../actions/types';

const initialState = {
    scannerData: []
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SCANNER:
        return {           
            scannerData: action.payload
        };
      default:
        return state;
    }
};
  