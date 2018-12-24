import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

// show to the user whether the template is in production or development
const Maturity = ({ maturity, classes }) => {
  switch (maturity) {
    case 'development':
      return (
        <Tooltip title="Development-Only">
          <Avatar className={classes.development}>
            D
          </Avatar>
        </Tooltip>
      );
    case 'production':
      return (
        <Tooltip title="Production-Ready">
          <Avatar className={classes.production}>
            P
          </Avatar>
        </Tooltip>
      );
    default:
      return (
        <Tooltip title="Unknown Status">
          <Avatar>
            ?
          </Avatar>
        </Tooltip>
      );
  }
};

Maturity.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  maturity: PropTypes.string,
};

Maturity.defaultProps = {
  maturity: '',
};

export default Maturity;
