import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './container/App';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App
      googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyDIUcpcXHO8yGpPEt8MjwozzHz5OiyDr_U&libraries=places'}
      loadingElement={<div style={ { height: '100%' }} />}
    />
  </Provider>
, document.getElementById('root'));
