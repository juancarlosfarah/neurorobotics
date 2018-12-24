import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import HomeIcon from '@material-ui/icons/Home';
import { closeSideMenu, getTemplates } from '../../actions';
import { HOME_PATH, TEMPLATES_PATH, WORKSPACE_PATH } from '../../config/paths';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SideMenu extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    dispatchCloseSideMenu: PropTypes.func.isRequired,
    dispatchPush: PropTypes.func.isRequired,
  };

  handleHomeClick = () => {
    const { dispatchPush } = this.props;
    // redirect to home
    dispatchPush(HOME_PATH);
  };

  handleTemplatesClick = () => {
    const { dispatchPush } = this.props;
    // redirect to templates
    dispatchPush(TEMPLATES_PATH);
  };

  handleWorkspaceClick = () => {
    const { dispatchPush } = this.props;
    // redirect to workspace
    dispatchPush(WORKSPACE_PATH);
  };

  render() {
    const { classes, open, dispatchCloseSideMenu } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem
            button
            key="home"
            onClick={this.handleHomeClick}
            // disable if this is the current location
            disabled={window.location.hash === `#${HOME_PATH}`}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            key="templates"
            onClick={this.handleTemplatesClick}
            // disable if this is the current location
            disabled={window.location.hash === `#${TEMPLATES_PATH}`}
          >
            <ListItemIcon>
              <WidgetsIcon />
            </ListItemIcon>
            <ListItemText primary="Templates" />
          </ListItem>
          <ListItem
            button
            key="workspace"
            onClick={this.handleWorkspaceClick}
            // disable if this is the current location
            disabled={window.location.hash === `#${WORKSPACE_PATH}`}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Workspace" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer
          open={open}
          onClose={dispatchCloseSideMenu}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={dispatchCloseSideMenu}
            onKeyDown={dispatchCloseSideMenu}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ sideMenu }) => ({
  open: sideMenu.get('open'),
});

const mapDispatchToProps = {
  dispatchCloseSideMenu: closeSideMenu,
  dispatchGetTemplates: getTemplates,
  dispatchPush: push,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SideMenu));
