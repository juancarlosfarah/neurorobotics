import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../../types';

const openSideMenu = () => dispatch => dispatch({
  type: OPEN_SIDE_MENU,
});

const closeSideMenu = () => dispatch => dispatch({
  type: CLOSE_SIDE_MENU,
});

export {
  openSideMenu,
  closeSideMenu,
};
