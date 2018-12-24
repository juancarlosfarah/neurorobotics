import _ from 'lodash';
import {
  GET_TEMPLATES_SUCCESS,
  STAR_TEMPLATE_SUCCESS,
  STAR_TEMPLATE_ERROR,
  UNSTAR_TEMPLATE_SUCCESS,
  UNSTAR_TEMPLATE_ERROR,
  GET_TAGS_SUCCESS,
} from '../../types';

/**
 * gets the templates from the redux state
 * todo: in a production version this would fetch the templates from an api
 * @returns {Promise<Function>}
 */
const getTemplates = async () => async (dispatch, getState) => {
  try {
    const templates = getState().template.getIn(['collection', 'content']);
    dispatch({
      type: GET_TEMPLATES_SUCCESS,
      payload: templates,
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * marks a template as starred
 * @param index
 * @returns {Promise<Function>}
 */
const starTemplate = async index => async (dispatch, getState) => {
  try {
    const templates = getState().template.getIn(['collection', 'content']);
    const template = templates[index];
    template.starred = true;
    dispatch({
      type: STAR_TEMPLATE_SUCCESS,
      payload: [...templates],
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: STAR_TEMPLATE_ERROR,
      payload: err,
    });
  }
};

/**
 * marks a template as unstarred
 * @param index
 * @returns {Promise<Function>}
 */
const unstarTemplate = async index => async (dispatch, getState) => {
  try {
    const templates = getState().template.getIn(['collection', 'content']);
    const template = templates[index];
    template.starred = false;
    dispatch({
      type: UNSTAR_TEMPLATE_SUCCESS,
      payload: [...templates],
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: UNSTAR_TEMPLATE_ERROR,
      payload: err,
    });
  }
};

/**
 * gets a list of all the available tags currently used on templates
 * todo: in a production version this would fetch the tags from an api
 * @returns {Promise<Function>}
 */
const getTags = async () => async (dispatch, getState) => {
  try {
    // assume name is id
    const templates = getState().template.getIn(['collection', 'content']);
    let tags = [];
    templates.forEach((template) => {
      if (template.tags) {
        tags = [...tags, ...template.tags.toLowerCase().split(' ')];
      }
    });
    dispatch({
      type: GET_TAGS_SUCCESS,
      // only return each tag once
      payload: _.uniq(tags),
    });
  } catch (err) {
    console.error(err);
  }
};

export {
  getTemplates,
  starTemplate,
  unstarTemplate,
  getTags,
};
