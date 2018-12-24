import {
  ADD_TO_WORKSPACE_SUCCESS,
  REMOVE_FROM_WORKSPACE_SUCCESS,
} from '../../types';

/**
 * adds a template to the current user's workspace
 * @param template
 * @returns {Function}
 */
const addToWorkspace = template => (dispatch, getState) => {
  try {
    const experiment = {
      ...template,
      // create a random id
      id: Math.floor(Math.random() * 100).toString(),
      // assign the original id as the templateId
      templateId: template.id,
    };

    // save to session storage
    const username = getState().authentication.get('username');
    const experiments = [
      ...getState().workspace.getIn(['collection', 'content']),
      experiment,
    ];
    sessionStorage.setItem(username, JSON.stringify(experiments));

    // update redux store
    return dispatch({
      type: ADD_TO_WORKSPACE_SUCCESS,
      payload: experiment,
    });
  } catch (err) {
    return console.error(err);
  }
};

/**
 * removes a template from the current user's workspace
 * @param index
 * @returns {Function}
 */
const removeFromWorkspace = index => (dispatch, getState) => {
  try {
    // save to session storage
    const username = getState().authentication.get('username');
    const experiments = getState()
      .workspace
      .getIn(['collection', 'content'])
      .filter((e, i) => i !== index);
    sessionStorage.setItem(username, JSON.stringify(experiments));

    // update redux store
    return dispatch({
      type: REMOVE_FROM_WORKSPACE_SUCCESS,
      payload: index,
    });
  } catch (err) {
    return console.error(err);
  }
};

export {
  addToWorkspace,
  removeFromWorkspace,
};
