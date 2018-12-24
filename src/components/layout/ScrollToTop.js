import { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

// this higher-order component ensures that you always
// scroll to the top when navigating between screens
class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.shape({
      type: PropTypes.func,
    }).isRequired,
  };

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);
