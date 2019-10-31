import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";
import { getUser } from '../api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

async function isToken() {
  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);

    const res = await getUser();

    const auth = {
      isAuthenticated: true,
      user: res.data
    }

    return auth;
  }
}

const result = isToken().then(data => {
  console.log('11111', data);
  return data;
});

// const auth = await isToken();
// async () => { await isToken() }


const initialState = async () => ({
  auth: await result,
  // auth: {
  //   isAuthenticated: false,
  //   user: {}
  // },
  errorMessage: ''
});

export async function authReducer(state = await initialState.auth, action) {
  switch(action.type) {
    case types.SET_CURRENT_USER:
      console.log('111', initialState.auth);
      return await {
        isAuthenticated: !!action.user,
        user: action.user
      };

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
  auth: authReducer,
  errorMessage: errorReducer
});
