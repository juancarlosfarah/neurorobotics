import React, { Fragment } from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const EnvironmentModel = ({ environmentModel, classes }) => {
  if (environmentModel) {
    const { robotPose = {} } = environmentModel;
    const robotPoseKeys = Object.keys(robotPose);
    return (
      <Fragment>
        <Typography align="left" color="textSecondary">
          <strong>Environment Model:</strong>
        </Typography>
        {
          robotPoseKeys.map((key, i) => (
            <Typography
              align="left"
              className={classes.values}
              color="textSecondary"
              key={key}
              paragraph={i === robotPoseKeys.length - 1}
            >
              <strong>{ key.length > 1 ? `${_.capitalize(key)}: ` : `${key}: `}</strong>
              {environmentModel.robotPose[key]}
            </Typography>
          ))
        }
      </Fragment>
    );
  }
  return <div />;
};

EnvironmentModel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  environmentModel: PropTypes.shape({
    robotPose: PropTypes.object,
  }),
};

EnvironmentModel.defaultProps = {
  environmentModel: null,
};

export default EnvironmentModel;
