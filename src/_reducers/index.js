import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { songlists } from './songlists.reducer';

const rootReducer = combineReducers({
  authentication,
  songlists,
});

export default rootReducer;