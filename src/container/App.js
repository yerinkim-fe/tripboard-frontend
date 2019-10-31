import { connect } from 'react-redux';
import { withScriptjs } from 'react-google-maps';
import App from '../components/App/App';
import { getToken } from '../api';
import { setCurrentUser, setError } from '../actions';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
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
        dispatch(setCurrentUser(true));
      } else {
        dispatch(setError(res.data.message));
      }
    },
    onSignOut() {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(localStorage.jwtToken);
      dispatch(setCurrentUser(false));
    }
  };
};

export default withScriptjs(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
