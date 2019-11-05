import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '../../Error/Error'
import './TripList.scss';

export default function TripList(props) {
  const { trip } = props;
  const [ error, setError ] = useState('');

  const tripList = trip.map((trip, index) => {
    return (
      <li key={index}>
        <Link to={`/${trip._id}`}>
          <h2>{trip.sdate} - {trip.edate}</h2>
          <p>
            {trip.title}
          </p>
          <p>
            {trip.address.city}, {trip.address.country}
          </p>
        </Link>
      </li>
    );
  });

  return (
    <div className='trip-list'>
      {
        tripList.length > 0 ?
        <ul>{tripList}</ul> :
        null
      }

      <button type='button' className='button-list-hide' onClick={props.onHideListClick}>X</button>

      {
        error &&
        <Error
          message={error}
        />
      }
    </div>

  );
}
