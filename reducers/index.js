import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorsReduser from './errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReduser,
});
