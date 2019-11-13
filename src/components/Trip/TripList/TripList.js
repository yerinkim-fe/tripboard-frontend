import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '../../Error/Error';
import getDateFormat from '../../../utils/getDateFormat';
import './TripList.scss';

export default function TripList(props) {
  const { trip } = props;
  const [ error, setError ] = useState('');

  useEffect(() => {
    setError(error);
  }, [error]);

  const tripList = trip.map((trip, index) => {
    return (
      <li key={index}>
        <Link to={`/${trip._id}`}>
          <p className='date'>{getDateFormat(trip.sdate)} - {getDateFormat(trip.edate)}</p>
          <p className='title'>
            {trip.title}
          </p>
          <p className='place'>
            {trip.address.country && trip.address.country}
            {trip.address.city && ` ${trip.address.city}`}
          </p>
        </Link>
      </li>
    );
  });

  return (
    <div className='trip-list'>
      <div className='inner'>
        {
          tripList.length > 0 ?
          <ul>{tripList}</ul> :
          null
        }
      </div>

      <button type='button' className='button-close' onClick={props.onHideListClick}></button>

      {
        error &&
        <Error
          message={error}
        />
      }
    </div>

  );
}
