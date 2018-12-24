import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { signIn } from '../../../actions';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary[500],
    height: '100%',
  },
  form: {
    padding: theme.spacing.unit * 5,
    margin: theme.spacing.unit,
  },
  label: {
    marginBottom: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    textTransform: 'none',
  },
});

class SignIn extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    dispatchSignIn: PropTypes.func.isRequired,
  };

  // default username to empty string to indicate that no one is logged in
  state = {
    username: '',
  };

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleSignIn = () => {
    const { dispatchSignIn } = this.props;
    const { username } = this.state;
    if (username && username.length) {
      dispatchSignIn(username);
    }
  };

  handlePressEnterKey = (event) => {
    const ENTER_KEY = 13;
    const key = event.keyCode || event.which;
    if (key === ENTER_KEY) {
      this.handleSignIn();
    }
  };

  render() {
    const { classes } = this.props;
    const { username } = this.state;

    return (
      <div className={classes.container}>
        <Grid container alignItems="center" justify="center">
          <Grid xs={12} sm={8} md={6} item>
            <Paper className={classes.form}>
              <Typography variant="h3" component="h3" className={classes.label} align="center">
                Neurorobotics
              </Typography>
              <Typography component="p" paragraph>
                Welcome to the Neurorobotics platform. Sign in with your username so that you can
                save experiment templates to your workspace. When you sign back in, those templates
                will still be accessible for you, but not to others who have signed in with a
                different username.
              </Typography>
              <Typography variant="h5" component="h5" className={classes.label}>
                Sign In
              </Typography>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <FaceIcon />
                </Grid>
                <Grid item md sm xs>
                  <TextField
                    id="username"
                    label="Username"
                    fullWidth
                    autoFocus
                    required
                    autoComplete="off"
                    value={username}
                    onChange={this.handleChange}
                    onKeyPress={this.handlePressEnterKey}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleSignIn}
                  disabled={!username || !username.length}
                  fullWidth
                >
                  Sign In
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = {
  dispatchSignIn: signIn,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));
