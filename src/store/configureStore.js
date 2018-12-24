import {
  createStore,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import createRootReducer from '../reducers';

/**
 * configures the store and returns it along with the history for the router
 * @param state
 * @returns {{store: Store<any>, history}}
 */
const configureStore = (state) => {
  // using hash history in order to run under a file url pattern
  const history = createHashHistory();
  const RouterMiddleware = routerMiddleware(history);
  // create the store
  const store = createStore(
    createRootReducer(history),
    state,
    composeWithDevTools(applyMiddleware(ReduxThunk, ReduxPromise, RouterMiddleware)),
  );

  return {
    store,
    history,
  };
};

export default configureStore;
