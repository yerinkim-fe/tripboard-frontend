import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Error from '../../Error/Error'
import axios from 'axios';

export default function TripBoard(props) {
  const { onSignOut, errorMessage } = props;
  const [ error, setError ] = useState('');

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handleSignOut = () => {
   onSignOut();
  };

  return (
    <div>
      <h1>트립보드</h1>

      <header>
        <ul>
          <li><button type='button' onClick={handleSignOut}>Sign out</button></li>
        </ul>
      </header>

      {
        error &&
        <Error
          message={error}
        />
      }

    </div>
  );
}
