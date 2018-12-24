import Immutable from 'immutable';
import {
  GET_TEMPLATES_SUCCESS,
  STAR_TEMPLATE_SUCCESS,
  UNSTAR_TEMPLATE_SUCCESS,
  GET_TAGS_SUCCESS,
} from '../types';
import Templates from '../data/templates';

const INITIAL_STATE = Immutable.Map({
  collection: Immutable.Map({
    content: Templates.map((template, i) => ({
      id: String(i),
      ...template,
    })),
    error: null,
    activity: false,
    tags: [],
  }),
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_TEMPLATES_SUCCESS:
      return state.setIn(['collection', 'content'], payload);

    case STAR_TEMPLATE_SUCCESS:
      return state.setIn(['collection', 'content'], payload);

    case UNSTAR_TEMPLATE_SUCCESS:
      return state.setIn(['collection', 'content'], payload);

    case GET_TAGS_SUCCESS:
      return state.setIn(['collection', 'tags'], payload);

    default:
      return state;
  }
};
