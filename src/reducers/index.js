import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import template from './template';
import sideMenu from './sideMenu';
import authentication from './authentication';
import workspace from './workspace';

// this is the central redux state
const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  template,
  sideMenu,
  authentication,
  workspace,
});

export default createRootReducer;
