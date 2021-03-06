import { connect } from 'react-redux';
import { withScriptjs } from 'react-google-maps';
import App from '../components/App/App';
import { getToken, getTrip, getTripDetail } from '../api';
import { setIsAuthenticated, setCurrentUser, tripDataLoad, tripDetailDataLoad, setError } from '../actions';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    trip: state.trip,
    tripDetail: state.tripDetail,
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
        setAuthorizationToken();

        const user = jwt.verify(token, process.env.REACT_APP_YOUR_SECRET_KEY);
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
      } else {
        dispatch(setError(res.data.message));
      }
    },
    onSignOut() {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken();
      dispatch(setCurrentUser({}));
      dispatch(setIsAuthenticated(false));
      dispatch(tripDataLoad([]));
    },
    onConfirmUser(token) {
      try {
        setAuthorizationToken();
        const user = jwt.verify(token, process.env.REACT_APP_YOUR_SECRET_KEY);
        dispatch(setCurrentUser(user));
        dispatch(setIsAuthenticated(true));
      } catch (err) {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken();
        dispatch(setCurrentUser({}));
        dispatch(setIsAuthenticated(false));
      }
    },
    async onTripLoad(userId) {
      const res = await getTrip(userId);

      if (res.status === 200) {
        const trip = res.data.trip;
        dispatch(tripDataLoad(trip));
      } else {
        dispatch(setError(res.data.message));
      }
    },
    async onTripDetailLoad(tripId) {
      const res = await getTripDetail(tripId);

      if (res.status === 200) {
        const tripDetail = res.data.trip;
        dispatch(tripDetailDataLoad(tripDetail));
      } else {
        dispatch(setError(res.data.message));
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
