import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorsReducer from './errorReducer';
import warehouseReducer from './warehouseReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  warehouse: warehouseReducer,
  products: productsReducer,
});
