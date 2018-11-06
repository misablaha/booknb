import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import { userPropTypes } from '../propTypes';
import { userByIdSelector } from '../../selectors/user';

const UserLink = (props) => {
  const { displayName } = props.user;
  return (
    <Typography variant="subtitle2" color="inherit">
      {displayName}
    </Typography>
  );
};
UserLink.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.shape(userPropTypes).isRequired,
};

const mapStateToProps = (...args) => ({
  user: userByIdSelector(...args),
});

export default connect(mapStateToProps)(UserLink);
