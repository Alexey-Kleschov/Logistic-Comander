import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorsReduser from './errorReducer';
import scannerReducer from './scannerReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorsReduser,
  scanner: scannerReducer
});
