import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  appBar: {
    borderTop: 'solid',
    borderTopWidth: '1px',
    borderTopColor: theme.palette.primary,
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    margin: theme.spacing.unit / 4,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters = (props) => {
  const {
    classes,
    searchQuery,
    handleChangeSearchQuery,
    handleChangeTags,
    tags,
    handleDeleteTag,
    tagList,
    handleChangeFavorites,
    starredOnly,
    handleHideFilters,
  } = props;

  return (
    <AppBar
      position="fixed"
      color="default"
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <TextField
          id="search"
          label="Search"
          type="search"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
          className={classes.textField}
          margin="normal"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="tags">
            Tags
          </InputLabel>
          <Select
            multiple
            value={tags}
            onChange={handleChangeTags}
            input={<Input id="tags" />}
            renderValue={selected => (
              <div className={classes.tags}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    className={classes.tag}
                    onDelete={handleDeleteTag(value)}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {tagList.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            (
              <Switch
                checked={starredOnly}
                onChange={handleChangeFavorites('starredOnly')}
                value="starredOnly"
                color="primary"
              />
            )
          }
          label="Favourites"
        />
        <Tooltip title="Hide Filters">
          <IconButton
            aria-label="Hide Filters"
            onClick={handleHideFilters}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

Filters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string),
  starredOnly: PropTypes.bool,
  searchQuery: PropTypes.string,
  handleChangeSearchQuery: PropTypes.func.isRequired,
  handleChangeTags: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  handleChangeFavorites: PropTypes.func.isRequired,
  handleHideFilters: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  tagList: [],
  starredOnly: false,
  searchQuery: '',
};

export default withStyles(styles, { withTheme: true })(Filters);
