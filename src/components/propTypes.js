import PropTypes from 'prop-types';
import { OFFER, REQUIRE, SUGGEST } from '../actions/add';

export const userPropTypes = {
  _id: PropTypes.string,
  displayName: PropTypes.string,
  name: PropTypes.shape({
    familyName: PropTypes.string,
    givenName: PropTypes.string
  }),
  email: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
};

export const publicationPropTypes = {
  code: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
};

export const bookPropTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
  publications: PropTypes.arrayOf(PropTypes.shape(publicationPropTypes)),
};

export const relationPropTypes = {
  userId: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([OFFER, REQUIRE, SUGGEST]).isRequired,
};
