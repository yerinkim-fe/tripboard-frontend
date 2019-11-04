import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import TripBoard from '../Trip/TripBoard/TripBoard';
import TripNew from '../Trip/TripNew/TripNew';
import './App.scss';

export default function App(props) {
  const { isAuthenticated, user, onSignIn, onSignOut, errorMessage } = props;

  console.log('11111', props);

  // useEffect(() => {
  //   props.onLoad()
  // }, []);

  // if (props.isLoading) {
  //   return <div className='loading'></div>
  // }

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
          render={() => {
            if (isAuthenticated) {
              return <TripBoard
                onSignOut={onSignOut}
                errorMessage={errorMessage}
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
