import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import Chip from '@material-ui/core/Chip/Chip';
import {
  starTemplate,
  unstarTemplate,
  removeFromWorkspace,
} from '../../../actions';
import Maturity from '../../common/Maturity';
import Timeout from '../../common/Timeout';
import EnvironmentModel from '../../common/EnvironmentModel';
import CameraPose from '../../common/CameraPose';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  production: {
    backgroundColor: green[500],
  },
  development: {
    backgroundColor: orange[500],
  },
  values: {
    marginLeft: theme.spacing.unit * 2,
  },
  subValues: {
    marginLeft: theme.spacing.unit * 4,
  },
  clearIcon: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class ExperimentCard extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    template: PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      tags: PropTypes.string,
      starred: PropTypes.bool,
      maturity: PropTypes.string,
      environmentModel: PropTypes.object,
      timeout: PropTypes.string,
      cameraPose: PropTypes.object,
    }).isRequired,
    dispatchRemoveFromWorkspace: PropTypes.func.isRequired,
  };

  state = { expanded: false };

  // show more information
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleAddToWorkspaceClick = () => {
    const {
      dispatchRemoveFromWorkspace,
      index,
    } = this.props;
    dispatchRemoveFromWorkspace(index);
  };

  renderTags = (tags = '', className) => {
    const tagList = tags.split(' ');
    return tagList.map((tag) => {
      if (tag !== '') {
        return (
          <Chip
            label={tag.toLowerCase()}
            key={`${tag}-${Math.random()}`}
            className={className}
          />
        );
      }
      return <div key={Math.random()} />;
    });
  };

  render() {
    const {
      expanded,
    } = this.state;

    const {
      classes,
      template: {
        description,
        name,
        thumbnail,
        tags,
        maturity,
        environmentModel,
        timeout,
        cameraPose,
      } = {},
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Maturity maturity={maturity} classes={classes} />
          }
          titleTypographyProps={{
            color: 'textSecondary',
            variant: 'subtitle1',
          }}
          title={name}
          action={(
            <Tooltip title="Remove from Workspace">
              <IconButton
                className={classes.clearIcon}
                aria-label="Remove from Workspace"
                onClick={this.handleAddToWorkspaceClick}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        />
        <CardMedia
          className={classes.media}
          image={`./static/images/thumbnails/${thumbnail}`}
          title={name}
        />
        <CardContent>
          <Typography
            component="p"
            align="left"
            color="textSecondary"
          >
            { description }
          </Typography>
          { this.renderTags(tags, classes.chip) }
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={
              classnames(
                classes.expand,
                {
                  [classes.expandOpen]: expanded,
                },
              )
            }
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show More"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="h6"
              align="left"
              color="textSecondary"
            >
              Details
            </Typography>
            <Timeout timeout={timeout} />
            <EnvironmentModel environmentModel={environmentModel} classes={classes} />
            <CameraPose cameraPose={cameraPose} classes={classes} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  dispatchStarTemplate: starTemplate,
  dispatchUnstarTemplate: unstarTemplate,
  dispatchRemoveFromWorkspace: removeFromWorkspace,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(ExperimentCard));
