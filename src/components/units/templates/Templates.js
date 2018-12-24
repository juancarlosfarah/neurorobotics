import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/es/Typography/Typography';
import Divider from '@material-ui/core/es/Divider/Divider';
import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import TemplateCard from './TemplateCard';
import { getTemplates, getTags } from '../../../actions/templates';
import Filters from './Filters';

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

class Templates extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatchGetTemplates: PropTypes.func.isRequired,
    dispatchGetTags: PropTypes.func.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      description: PropTypes.string,
      tags: PropTypes.string,
      starred: PropTypes.bool,
    })).isRequired,
  };

  state = {
    starredOnly: false,
    tags: [],
    showFilters: false,
    searchQuery: '',
  };

  constructor(props) {
    super(props);
    const {
      dispatchGetTemplates,
      dispatchGetTags,
    } = props;
    dispatchGetTemplates();
    dispatchGetTags();
  }

  // this function does all the filtering
  renderTemplates = (classes) => {
    let { templates } = this.props;
    const {
      starredOnly,
      tags: selectedTags,
      searchQuery,
    } = this.state;

    // filter for starred templates
    if (starredOnly) {
      templates = templates.filter(template => template.starred);
    }

    // filter for selected tags by running a case-insensitive
    // regex against the template's tag field
    if (selectedTags.length) {
      templates = templates.filter((template) => {
        for (let i = 0; i < selectedTags.length; i += 1) {
          const tag = selectedTags[i];
          const regex = new RegExp(tag, 'i');
          if (template.tags && regex.test(template.tags)) {
            return true;
          }
        }
        return false;
      });
    }

    // filter by the search query, which is a case insensitive
    // regex against the template's name and description fields
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      templates = templates.filter(template => (template.name && regex.test(template.name))
          || ((template.description && regex.test(template.description))));
    }

    // if there are results, show them
    if (templates.length) {
      return templates.map(template => (
        <Grid item key={template.id}>
          <TemplateCard
            template={template}
            selectedTags={selectedTags}
          />
        </Grid>
      ));
    }

    // otherwise, say that nothing matches the criteria
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
          No templates match the filtering criteria.
        </Typography>
      </Grid>
    );
  };

  handleChangeFavorites = name => event => this.setState({ [name]: event.target.checked });

  handleChangeTags = event => this.setState({ tags: event.target.value });

  handleDeleteTag = tag => () => {
    this.setState((state) => {
      const tags = [...state.tags];
      const tagToDelete = tags.indexOf(tag);
      tags.splice(tagToDelete, 1);
      return { tags };
    });
  };

  handleChangeSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleShowFilters = () => {
    this.setState({
      showFilters: true,
    });
  };

  handleHideFilters = () => {
    this.setState({
      showFilters: false,
    });
  };

  renderFilters = () => {
    const {
      showFilters,
      starredOnly,
      tags,
      searchQuery,
    } = this.state;
    const {
      tags: tagList,
    } = this.props;

    if (showFilters) {
      return (
        <Filters
          starredOnly={starredOnly}
          tags={tags}
          searchQuery={searchQuery}
          tagList={tagList}
          handleChangeFavorites={this.handleChangeFavorites}
          handleChangeTags={this.handleChangeTags}
          handleDeleteTag={this.handleDeleteTag}
          handleChangeSearchQuery={this.handleChangeSearchQuery}
          handleHideFilters={this.handleHideFilters}
        />
      );
    }

    return <div />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.title}>
          <Typography
            component="h4"
            variant="h4"
            align="left"
            color="textSecondary"
          >
            Templates
          </Typography>
          <br />
          <Typography
            component="p"
            align="left"
            color="textSecondary"
          >
            Here you will find all of the templates available. You may save them to your favourites
            or clone them to your workspace for further experimentation. Use the available filters
            by clicking on the filter button on the bottom right.
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <Tooltip title="Show Filters">
          <Fab
            id="templatesFilter"
            color="secondary"
            className={classes.fab}
            onClick={this.handleShowFilters}
          >
            <FilterListIcon />
          </Fab>
        </Tooltip>
        <Grid
          id="templatesGrid"
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={16}
          className={classes.grid}
        >
          { this.renderTemplates(classes) }
        </Grid>
        { this.renderFilters() }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ template }) => ({
  templates: template.getIn(['collection', 'content']),
  tags: template.getIn(['collection', 'tags']),
});

const mapDispatchToProps = {
  dispatchGetTemplates: getTemplates,
  dispatchGetTags: getTags,
};

const componentWithStyles = withStyles(styles)(Templates);

export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
