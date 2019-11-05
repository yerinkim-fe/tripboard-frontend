import { connect } from 'react-redux';
import { withScriptjs } from 'react-google-maps';
import App from '../components/App/App';
import { getToken, getUser } from '../api';
import { setIsAuthenticated, setCurrentUser, setError } from '../actions';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onSignIn(user) {
      const res = await getToken(user);

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(localStorage.jwtToken);

        const user = jwt.verify(token, process.env.REACT_APP_YOUR_SECRET_KEY);
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
      } else {
        dispatch(setError(res.data.message));
      }
    },
    onSignOut() {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(localStorage.jwtToken);
      dispatch(setCurrentUser({}));
      dispatch(setIsAuthenticated(false));
    },
    onConfirmUser(token) {
      try {
        const user = jwt.verify(token, process.env.REACT_APP_YOUR_SECRET_KEY);
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
      } catch (err) {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(localStorage.jwtToken);
        dispatch(setCurrentUser({}));
        dispatch(setIsAuthenticated(false));
      }
    }
  };
};

export default withScriptjs(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
