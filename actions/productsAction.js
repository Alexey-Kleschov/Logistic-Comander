import {CURRENT_PRODUCTS} from './types';

export const setProducts = products => dispatch => {
  dispatch({
    type: CURRENT_PRODUCTS,
    payload: products,
  });
};
