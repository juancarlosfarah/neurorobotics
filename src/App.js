import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import Main from './components/layout/Main';
import Header from './components/layout/Header';
import SideMenu from './components/common/SideMenu';
import SignIn from './components/units/authentication/SignIn';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// create a material ui theme at the root component
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
});

const App = ({ username }) => {
  if (!username) {
    return (
      <MuiThemeProvider theme={theme}>
        <div
          style={{
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
            position: 'fixed',
          }}
        >
          <SignIn />
        </div>
      </MuiThemeProvider>
    );
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <SideMenu />
        <Main />
        <ToastContainer />
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  username: PropTypes.string,
};

App.defaultProps = {
  username: null,
};

const mapStateToProps = ({ authentication }) => ({
  username: authentication.get('username'),
});

export default withRouter(connect(mapStateToProps)(App));
