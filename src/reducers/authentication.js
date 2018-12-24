import Immutable from 'immutable';
import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '../types';

const INITIAL_STATE = Immutable.Map({
  username: null,
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      // payload is the username
      return state.set('username', payload);

    case SIGN_OUT_SUCCESS:
      return state.delete('username');

    default:
      return state;
  }
};
