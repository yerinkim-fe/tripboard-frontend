import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import TripList from '../TripList/TripList';
import Error from '../../Error/Error';
import './TripBoard.scss';

export default function TripBoard(props) {
  const { user, trip, onTripLoad, onSignOut, errorMessage, history } = props;
  const [ isList, setIsList ] = useState(false);
  const [ error, setError ] = useState('');

  let lat = 37.566682;
  let lng = 126.978382;

  const center = { lat, lng };
  const zoom = 3;

  const [ mapPosition, setMapPosition ] = useState({
    lat: center.lat,
    lng: center.lng
  });

  const [ markerPosition, setMarkerPosition ] = useState({
    lat: center.lat,
    lng: center.lng
  });

  useEffect(() => {
    if (!trip.length && user) {
      onTripLoad(user.user_id);
    }
  }, [user]);

  useEffect(() => {
    if (trip.length > 0) {
      const lat = trip[0].location.coordinates[1];
      const lng = trip[0].location.coordinates[0];

      setMarkerPosition({
        lat,
        lng
      });

      setMapPosition({
        lat,
        lng
      });

    }
  }, [trip]);

  const handleMarkerClick = tripId => {
    history.push(`/${tripId}`);
  };

  const handleShowListClick = () => {
    setIsList(true);
  }

  const handleHideListClick = () => {
    setIsList(false);
  }

  const AsyncMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
      {
        trip.map(place => (
          <Marker
            position={{ lat: place.location.coordinates[1], lng: place.location.coordinates[0] }}
            key={place._id}
            onClick={() => handleMarkerClick(place._id)}
          />
        ))
      }
    </GoogleMap>
  ));

  let map;

  if (center.lat !== undefined) {
    map = <div>
      <AsyncMap
        containerElement={<div style={{ height: '100vh' }} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
    </div>
  } else {
    map = <div style={{ height: '100vh' }} />
  }

  useEffect(() => {
    setError(errorMessage);
    setTimeout(() => setError(''), 3000);
  }, [errorMessage]);

  useEffect(() => {
    setError(error);
    setTimeout(() => setError(''), 3000);
  }, [error]);

  const handleSignOut = () => {
   onSignOut();
  };

  return (
    <div className='container'>
      <header className='main'>
        <h1>Trip Board</h1>
        <button type='button' className='button-list' onClick={handleShowListClick}></button>
        <button type='button' className='button-signout' onClick={handleSignOut}></button>

        <Link to='/chart' className='button-chart'></Link>

      </header>


      {map}

      <Link to='/new' className='button-plus'></Link>


      {
        isList &&
        <TripList
          trip={trip}
          onHideListClick={handleHideListClick}
        />
      }

      {
        error &&
        <Error
          message={error}
        />
      }

    </div>
  );
}
