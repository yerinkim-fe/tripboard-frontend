import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";
import setAuthorizationToken from '../utils/setAuthorizationToken';

const initialState = {
  isAuthenticated: false,
  user: {},
  errorMessage: ''
};

// 로그인을 할 때 getUser를 하면 그 순간에만 user정보가 state에 저장되고 리렌더링할 때 초기화된다. 왜??? 로그인완료 후에만 가져오니까.
// 그래서 렌더링할 때마다 getUser를 했는데.. 비동기 문제... tripboard에서.. 어떻게 처리해야하지??

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
  errorMessage: errorReducer
});
