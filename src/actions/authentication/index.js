import { push } from 'connected-react-router';
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  LOAD_WORKSPACE_SUCCESS,
  CLEAR_WORKSPACE_SUCCESS,
} from '../../types';
import { HOME_PATH } from '../../config/paths';

const signIn = username => (dispatch) => {
  try {
    // if the user has a saved workspace from before
    // load it into the redux state from session storage
    const templates = sessionStorage.getItem(username);
    if (templates) {
      dispatch({
        type: LOAD_WORKSPACE_SUCCESS,
        payload: JSON.parse(templates),
      });
    }
    // redirect to home if not there already
    if (window.location.hash !== `#${HOME_PATH}`) {
      dispatch(push(HOME_PATH));
    }

    // tell the redux state that the user has signed in
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: username,
    });
  } catch (err) {
    console.error(err);
  }
};

const signOut = () => (dispatch) => {
  try {
    // clear the workspace
    dispatch({
      type: CLEAR_WORKSPACE_SUCCESS,
    });
    // tell the redux state that the user has signed out
    dispatch({
      type: SIGN_OUT_SUCCESS,
    });
    // redirect to home
    dispatch(push(HOME_PATH));
  } catch (err) {
    console.error(err);
  }
};

export {
  signIn,
  signOut,
};
