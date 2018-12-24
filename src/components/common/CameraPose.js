import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const CameraPose = ({ cameraPose, classes }) => {
  if (cameraPose) {
    const {
      cameraPosition = {},
      cameraLookAt = {},
    } = cameraPose;

    return (
      <Fragment>
        <Typography align="left" color="textSecondary">
          <strong>Camera:</strong>
        </Typography>
        <Typography
          align="left"
          className={classes.values}
          color="textSecondary"
        >
          <strong>Position:</strong>
        </Typography>
        {
          Object.keys(cameraPosition).map(key => (
            <Typography
              key={key}
              align="left"
              className={classes.subValues}
              color="textSecondary"
            >
              <strong>{ `${key}: `}</strong>
              {cameraPosition[key]}
            </Typography>
          ))
        }
        <Typography
          align="left"
          className={classes.values}
          color="textSecondary"
        >
          <strong>Look At:</strong>
        </Typography>
        {
          Object.keys(cameraLookAt).map(key => (
            <Typography
              key={key}
              align="left"
              className={classes.subValues}
              color="textSecondary"
            >
              <strong>{ `${key}: `}</strong>
              {cameraLookAt[key]}
            </Typography>
          ))
        }
      </Fragment>
    );
  }
  return <div />;
};

CameraPose.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  cameraPose: PropTypes.shape({
    cameraPosition: PropTypes.object,
    cameraLookAt: PropTypes.object,
  }),
};

CameraPose.defaultProps = {
  cameraPose: null,
};

export default CameraPose;
