import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import Divider from '@material-ui/core/es/Divider/Divider';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ExperimentCard from './ExperimentCard';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    padding: theme.spacing.unit * 2,
  },
  grid: {
    marginBottom: theme.spacing.unit * 10,
  },
  noResults: {
    marginTop: theme.spacing.unit * 5,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Workspace extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    experiments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
    })).isRequired,
  };

  renderExperiments() {
    const {
      experiments,
      classes,
    } = this.props;
    if (experiments.length) {
      return experiments.map((experiment, i) => (
        <Grid item key={experiment.id}>
          <ExperimentCard
            index={i}
            template={experiment}
          />
        </Grid>
      ));
    }
    return (
      <Grid item key="none">
        <BlockIcon
          className={classes.noResults}
          fontSize="large"
          color="secondary"
        />
        <Typography
          component="h5"
          variant="h5"
          color="textSecondary"
        >
          You have no experiments in your workspace.
        </Typography>
      </Grid>
    );
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          <Typography
            component="h4"
            variant="h4"
            align="left"
            color="textSecondary"
          >
            Workspace
          </Typography>
          <br />
          <Typography
            component="p"
            align="left"
            color="textSecondary"
          >
            Here you will find all of the experiments you have added to your workspace.
            If you want to remove an experiment, you can simply click on the remove button
            on the top right of each card.
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={16}
          className={classes.grid}
        >
          { this.renderExperiments(classes) }
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ workspace }) => ({
  experiments: workspace.getIn(['collection', 'content']),
});

export default withStyles(styles)(connect(mapStateToProps)(Workspace));
