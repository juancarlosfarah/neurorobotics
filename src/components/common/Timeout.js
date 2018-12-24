import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

const Timeout = ({ timeout }) => {
  // allow zero timeouts
  if (_.isNull(timeout) || typeof timeout === 'undefined') {
    return <div />;
  }
  return (
    <Typography paragraph align="left" color="textSecondary">
      <strong>Timeout: </strong>
      {timeout}
    </Typography>
  );
};

Timeout.propTypes = {
  timeout: PropTypes.string,
};

Timeout.defaultProps = {
  timeout: null,
};

export default Timeout;
