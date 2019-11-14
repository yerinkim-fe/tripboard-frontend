import * as types from "../constants/actionTypes";


export const setIsAuthenticated = isAuthenticated => ({
  type: types.SET_AUTHENTICATED,
  isAuthenticated
});

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  user
});

export const tripDataLoad = trip => ({
  type: types.TRIP_DATA_LOAD,
  trip
});

export const tripDetailDataLoad = tripDetail => ({
  type: types.TRIP_DETAIL_DATA_LOAD,
  tripDetail
});

export const setError = message => ({
  type: types.SET_ERROR,
  message
});
