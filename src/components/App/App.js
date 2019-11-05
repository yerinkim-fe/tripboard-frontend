import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import TripBoard from '../Trip/TripBoard/TripBoard';
import TripNew from '../Trip/TripNew/TripNew';
import './App.scss';

export default function App(props) {
  const { onConfirmUser, isAuthenticated, user, onSignIn, onSignOut, errorMessage } = props;

  useEffect(() => {
    if (localStorage.jwtToken) {
      onConfirmUser(localStorage.jwtToken);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact path='/signin'
          render={() => {
            if (isAuthenticated) {
              return <Redirect to='/' />;
            } else {
              return <SignIn
                onSignIn={onSignIn}
                errorMessage={errorMessage}
              />
            }
          }}
        />
        <Route
          exact path='/signup'
          render={() => {
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
                onSignOut={onSignOut}
                errorMessage={errorMessage}
                user={user}
              />
            } else {
              return <Redirect to='/signin' />;
            }
          }}
        />
        <Route
          exact path='/new'
          render={routeProps => {
            if (isAuthenticated) {
              return <TripNew
                {...routeProps}
                errorMessage={errorMessage}
                user={user}
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
