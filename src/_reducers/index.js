import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { songlists } from './songlists.reducer';
import { userConstants } from '../_constants';


const appReducer = combineReducers({
  authentication,
  songlists,
})

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
      // for all keys defined in your persistConfig(s)
      localStorage.removeItem('persist:root')

      return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;