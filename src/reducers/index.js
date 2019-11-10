import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";

const isToken = () => {
  if (localStorage.jwtToken) {
    return true;
  } else {
    return false;
  }
}

const initialState = {
  isAuthenticated: isToken(),
  user: null,
  trip: [],
  errorMessage: ''
};

export function authReducer(state = initialState.isAuthenticated, action) {
  switch(action.type) {
    case types.SET_AUTHENTICATED:
      return action.isAuthenticated;

    default:
      return state;
  }
}

export function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      return {...action.user};

    default:
      return state;
  }
}

export function tripReducer(state = initialState.trip, action) {
  switch(action.type) {
    case types.TRIP_DATA_LOAD:
      return action.trip;

    default:
      return state;
  }
}

export function errorReducer(state = initialState.errorMessage, action) {
  switch(action.type) {
    case types.SET_ERROR:
      return action.message;

    default:
      return state;
  }
}

export default combineReducers({
  isAuthenticated: authReducer,
  user: userReducer,
  trip: tripReducer,
  errorMessage: errorReducer
});
