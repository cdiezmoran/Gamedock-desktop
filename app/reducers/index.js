// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import games from './gameReducer';

const rootReducer = combineReducers({
  routing,
  games
});

export default rootReducer;
