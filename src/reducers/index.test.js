import { authReducer, userReducer, tripReducer, tripDetailReducer, errorReducer } from './index';
import * as types from "../constants/actionTypes";

describe('authReducer reducers', () => {
  const initialState = {
    isAuthenticated: false
  };

  it('should provide the initial state', () => {
    expect(authReducer(initialState.isAuthenticated, {})).toEqual(initialState.isAuthenticated);
  });

  it('should handle SET_AUTHENTICATED action', () => {
    expect(authReducer(initialState.isAuthenticated, { type: types.SET_AUTHENTICATED, isAuthenticated: true })).toEqual( true );
  });
});

describe('userReducer reducers', () => {
  const initialState = {
    user: null
  };

  it('should provide the initial state', () => {
    expect(userReducer(initialState.user, {})).toEqual(initialState.user);
  });

  it('should handle SET_CURRENT_USER action', () => {
    const user = {
      exp: 1574330566,
      iat: 1573725766,
      user_id: "5db9b960e5565e30b96ca966"
    }
    expect(userReducer(initialState.user, { type: types.SET_CURRENT_USER, user })).toEqual({ ...user });
  });
});

describe('tripReducer reducers', () => {
  const initialState = {
    trip: []
  };

  it('should provide the initial state', () => {
    expect(tripReducer(initialState.trip, {})).toEqual(initialState.trip);
  });

  it('should handle TRIP_DATA_LOAD action', () => {
    const trip = {
      title: "제주도 먹방여행",
      address: {
        city: "제주시",
        country: "대한민국"
      },
      created_by: "5db9b960e5565e30b96ca966",
      description: "",
      sdate: "2019-03-20T15:00:00.000Z",
      edate: "2019-03-31T15:00:00.000Z",
      location: {
        coordinates: [126.53118840000002, 33.4996213],
        type: "Point"
      },
      pictures: [{
        id: "5dcbcc2c64b59a83dd96546a",
        url: "https://trip-board.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2019-11-13-17-24-38-1.jpeg"
      }]
    };
    expect(tripReducer(initialState.trip, { type: types.TRIP_DATA_LOAD, trip })).toEqual({ ...trip });
  });
});

describe('tripDetailReducer reducers', () => {
  const initialState = {
    tripDetail: ''
  };

  it('should provide the initial state', () => {
    expect(tripDetailReducer(initialState.tripDetail, {})).toEqual(initialState.tripDetail);
  });

  it('should handle TRIP_DETAIL_DATA_LOAD action', () => {
    const tripDetail = {
      title: "제주도 먹방여행",
      address: {
        city: "제주시",
        country: "대한민국"
      },
      created_by: "5db9b960e5565e30b96ca966",
      description: "",
      sdate: "2019-03-20T15:00:00.000Z",
      edate: "2019-03-31T15:00:00.000Z",
      location: {
        coordinates: [126.53118840000002, 33.4996213],
        type: "Point"
      },
      pictures: [{
        id: "5dcbcc2c64b59a83dd96546a",
        url: "https://trip-board.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2019-11-13-17-24-38-1.jpeg"
      }]
    };
    expect(tripDetailReducer(initialState.tripDetail, { type: types.TRIP_DETAIL_DATA_LOAD, tripDetail })).toEqual({ ...tripDetail });
  });
});

describe('errorReducer reducers', () => {
  const initialState = {
    errorMessage: ''
  };

  it('should provide the initial state', () => {
    expect(errorReducer(initialState.errorMessage, {})).toEqual(initialState.errorMessage);
  });

  it('should handle SET_ERROR action', () => {
    expect(errorReducer(initialState.errorMessage, { type: types.SET_ERROR, message: 'error' })).toEqual('error');
  });
});
