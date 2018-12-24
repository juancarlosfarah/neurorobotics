import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import WidgetsIcon from '@material-ui/icons/Widgets';
import WorkIcon from '@material-ui/icons/Work';
import HomeCard from './HomeCard';
import { TEMPLATES_PATH, WORKSPACE_PATH } from '../../../config/paths';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    padding: theme.spacing.unit * 2,
  },
});

// eslint-disable-next-line react/prop-types
const Home = ({ classes }) => (
  <Fragment>
    <div className={classes.title}>
      <Typography
        component="h4"
        variant="h4"
        align="left"
        color="textSecondary"
      >
        Home
      </Typography>
      <br />
      <Typography
        component="p"
        align="left"
        color="textSecondary"
      >
        Welcome to your homepage. From here you can view the different functionalities available
        on the Neurorobotics platform. Currently you can browse through the experiment templates
        available or access your personal workspace by clicking on the respective cards below.
      </Typography>
    </div>
    <Divider className={classes.divider} />
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={16}
    >
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <HomeCard
          path={TEMPLATES_PATH}
          title="Templates"
          description="Browse through our comprehensive database of experiment templates."
          icon={<WidgetsIcon fontSize="inherit" />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <HomeCard
          path={WORKSPACE_PATH}
          title="Workspace"
          description="Access your personal workspace, where you have previously saved your experiments."
          icon={<WorkIcon fontSize="inherit" color="inherit" />}
        />
      </Grid>
    </Grid>
  </Fragment>
);

export default withStyles(styles)(Home);
