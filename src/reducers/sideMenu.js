import Immutable from 'immutable';
import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../types';

const INITIAL_STATE = Immutable.Map({
  open: false,
});

export default (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case OPEN_SIDE_MENU:
      return state.set('open', true);

    case CLOSE_SIDE_MENU:
      return state.set('open', false);

    default:
      return state;
  }
};
