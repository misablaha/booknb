import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

export const relationsSelector = state => state.relations.data;
export const relationsAreLoading = state => state.relations._metadata.fetching;

export const relationsByBookSelector = createSelector(
  relationsSelector,
  (data) => groupBy(data, 'bookId')
);

export const relationsByUserSelector = createSelector(
  relationsSelector,
  (data) => groupBy(data, 'userId')
);
