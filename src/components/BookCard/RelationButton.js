import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Star from '@material-ui/icons/ThumbUpOutlined';
import Help from '@material-ui/icons/HelpOutline';
import Book from '@material-ui/icons/ChromeReaderModeOutlined';
import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import { relationPropTypes } from '../propTypes';
import UserLink from '../User/UserLink';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const iconMap = {
  [OFFER]: Book,
  [REQUIRE]: Help,
  [SUGGEST]: Star,
};

const tooltipTitleMap = {
  [OFFER]: 'Může zapůjčit',
  [REQUIRE]: 'Shání',
  [SUGGEST]: 'Doporučuje k přečtení',
};

const StyledButton = withStyles((theme) => ({
  root: {
    flex: '1',
    color: theme.palette.grey.A200,
  },
  label: {
    justifyContent: 'left',
    color: theme.palette.grey.A200,
  },
}))(Button);

const RelationButton = (props) => {
  const { classes, onClick, relations, variant } = props;
  const Icon = iconMap[variant];

  const tooltipTitle = (
    <div>
      <Typography variant="caption" color="inherit">{tooltipTitleMap[variant]}</Typography>
      {relations.map(relation => (
        <UserLink
          key={relation.userId}
          userId={relation.userId}
        />
      ))}
    </div>
  );

  return (
    <Tooltip title={tooltipTitle} placement="left">
      <StyledButton onClick={onClick}>
        <Icon fontSize="small" className={classes.icon}/>
        {relations.length > 0 && (
          <Typography variant="button" color="textSecondary">{relations.length}</Typography>
        )}
      </StyledButton>
    </Tooltip>
  );
};

RelationButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  relations: PropTypes.arrayOf(PropTypes.shape(relationPropTypes)).isRequired,
  variant: PropTypes.oneOf([OFFER, REQUIRE, SUGGEST]).isRequired,
};

export default withStyles(styles)(RelationButton);
