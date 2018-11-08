import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';

import Star from '@material-ui/icons/ThumbUpOutlined';
import Help from '@material-ui/icons/HelpOutline';
import Book from '@material-ui/icons/ChromeReaderModeOutlined';
import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';

const styles = {
  root: {
    display: 'flex',
  },
  label: {
    flex: 1,
  },
};

const iconMap = {
  [OFFER]: Book,
  [REQUIRE]: Help,
  [SUGGEST]: Star,
};

const tooltipTitleMap = {
  [OFFER]: 'K půjčení',
  [REQUIRE]: 'Shání se',
  [SUGGEST]: 'Doporučené',
};

const FilterOption = (props) => {
  const { classes, checked, onChange, variant } = props;
  const Icon = iconMap[variant];

  return (
    <MenuItem classes={{ root: classes.root }}>
      <ListItemIcon>
        <Icon fontSize="small"/>
      </ListItemIcon>
      <FormControlLabel
        control={
          <Switch
            onChange={onChange}
            checked={checked}
            value={variant}
          />
        }
        label={tooltipTitleMap[variant]}
        labelPlacement="start"
        classes={{ root: classes.label }}
      />
    </MenuItem>
  );
};

FilterOption.propTypes = {
  classes: PropTypes.object,
  checked: PropTypes.bool,
  variant: PropTypes.string,
  onChange: PropTypes.func,
};

FilterOption.defaultProps = {
  checked: true,
};

export default withStyles(styles)(FilterOption);
