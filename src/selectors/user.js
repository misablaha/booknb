import { createSelector } from 'reselect';

const pickUserId = (state, props) => props.userId;

export const userMapSelector = state => state.users.data;
export const usersAreLoading = state => state.users._metadata.fetching;

export const meIsLoading = state => state.me._metadata.fetching;
export const isLogged = state => !!state.me.data;
export const meSelector = state => state.me.data;

export const userByIdSelector = createSelector(
  userMapSelector,
  pickUserId,
  (data, id) => data[id]
);
