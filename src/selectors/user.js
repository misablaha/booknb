export const meIsLoading = state => state.me._metadata.fetching;
export const isLogged = state => !!state.me.data;
export const meSelector = state => state.me.data;
