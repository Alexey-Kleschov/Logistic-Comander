import { SCANNER } from '../actions/types';

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SCANNER:
      return action.payload
    default:
      return state;
  }
};
  