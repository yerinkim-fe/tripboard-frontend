import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";
import setAuthorizationToken from '../utils/setAuthorizationToken';

function isToken() {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    return true;
  } else {
    return false;
  }
}

const initialState = {
  isAuthenticated: isToken(),
  errorMessage: ''
};

export function authReducer(state = initialState.isAuthenticated, action) {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      return action.isAuthenticated;

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
  errorMessage: errorReducer
});
