import Immutable from 'immutable';
import { toast } from 'react-toastify';
import {
  ADD_TO_WORKSPACE_SUCCESS,
  REMOVE_FROM_WORKSPACE_SUCCESS,
  LOAD_WORKSPACE_SUCCESS,
  CLEAR_WORKSPACE_SUCCESS,
} from '../types';

const INITIAL_STATE = Immutable.Map({
  collection: Immutable.Map({
    content: [],
  }),
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ADD_TO_WORKSPACE_SUCCESS:
      toast.success('Template successfully added to workspace.');
      return state.setIn(
        ['collection', 'content'],
        // append the payload to the end of the content array
        [
          ...state.getIn(['collection', 'content']),
          payload,
        ],
      );

    case REMOVE_FROM_WORKSPACE_SUCCESS:
      toast.success('Template successfully removed from workspace.');
      return state.setIn(
        ['collection', 'content'],
        // remove the element at the index specified by the payload
        state.getIn(['collection', 'content']).filter((e, i) => i !== payload),
      );

    case LOAD_WORKSPACE_SUCCESS:
      toast.success('Successfully loaded workspace.');
      return state.setIn(['collection', 'content'], payload);

    case CLEAR_WORKSPACE_SUCCESS:
      return state.setIn(['collection', 'content'], []);

    default:
      return state;
  }
};
