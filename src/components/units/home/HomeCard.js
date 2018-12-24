import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  cardHover: {
    margin: theme.spacing.unit,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#efefef',
    },
  },
  icon: {
    fontSize: '128px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class HomeCard extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    dispatchPush: PropTypes.func.isRequired,
  };

  render() {
    const {
      classes,
      title,
      description,
      dispatchPush,
      path,
      icon,
    } = this.props;

    return (
      <Card
        className={classes.cardHover}
        onClick={() => dispatchPush(path)}
      >
        <CardHeader
          titleTypographyProps={{
            color: 'textSecondary',
            variant: 'h5',
          }}
          title={title}
        />
        <CardContent className={classes.icon}>
          { icon }
        </CardContent>
        <CardContent>
          <Typography
            component="p"
            align="left"
            color="textSecondary"
          >
            { description }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  dispatchPush: push,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(HomeCard));
