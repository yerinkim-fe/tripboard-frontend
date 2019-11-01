import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import TripBoard from '../Trip/TripBoard/TripBoard';
// import './App.css';

export default function App(props) {
  const { isAuthenticated, onSignIn, errorMessage } = props;

  return (
    <Router>
      <Switch>
        <Route
          exact path='/signin'
          render={routeProps => {
            if (isAuthenticated) {
              return <Redirect to='/' />;
            } else {
              return <SignIn
                {...routeProps}
                onSignIn={onSignIn}
                errorMessage={errorMessage}
              />
            }
          }}
        />
        <Route
          exact path='/signup'
          render={routeProps => {
            return <SignUp
            />
          }}
        />
        <Route
          exact path='/'
          render={routeProps => {
            if (isAuthenticated) {
              return <TripBoard
                {...routeProps}
                {...props}
              />
            } else {
              return <Redirect to='/signin' />;
            }

          }}
        />
      </Switch>
    </Router>
  );
}
