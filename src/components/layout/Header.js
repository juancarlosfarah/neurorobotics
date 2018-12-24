import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/es/Divider/Divider';
import { connect } from 'react-redux';
import { closeSideMenu, openSideMenu, signOut } from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: '1rem',
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: '#fff',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    textTransform: 'none',
  },
});

class Header extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    dispatchOpenSideMenu: PropTypes.func.isRequired,
    dispatchCloseSideMenu: PropTypes.func.isRequired,
    dispatchSignOut: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => this.setState({ anchorEl: event.currentTarget });

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => this.setState({ mobileMoreAnchorEl: event.currentTarget });

  handleMobileMenuClose = () => this.setState({ mobileMoreAnchorEl: null });

  handleMenuClick = () => {
    const {
      open,
      dispatchCloseSideMenu,
      dispatchOpenSideMenu,
    } = this.props;

    if (open) {
      dispatchCloseSideMenu();
    } else {
      dispatchOpenSideMenu();
    }
  };

  handleSignOut = () => {
    const {
      dispatchSignOut,
    } = this.props;
    this.handleMenuClose();
    dispatchSignOut();
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, username } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // right dropdown menu for regular screens
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem disabled>
          <AccountCircle />
          &nbsp;
          {username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
      </Menu>
    );

    // right dropdown menu for mobile screens
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Neurorobotics
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                className={classes.button}
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                &nbsp;
                {username}
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

const mapStateToProps = ({ sideMenu, authentication }) => ({
  open: sideMenu.get('open'),
  username: authentication.get('username'),
});

const mapDispatchToProps = {
  dispatchOpenSideMenu: openSideMenu,
  dispatchCloseSideMenu: closeSideMenu,
  dispatchSignOut: signOut,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));
