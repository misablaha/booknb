import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RelationButton from './RelationButton';
import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import { relationPropTypes } from '../propTypes';

const Relations = (props) => {
  const { relations } = props;

  return (
    <Fragment>
      {[SUGGEST, REQUIRE, OFFER].map(variant => (
        <RelationButton
          key={variant}
          variant={variant}
          relations={relations.filter(relation => relation.variant === variant)}
        />
      ))}
    </Fragment>
  );
};

Relations.propTypes = {
  relations: PropTypes.arrayOf(PropTypes.shape(relationPropTypes)).isRequired,
};

export default Relations;
