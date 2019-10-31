import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TripBoard(props) {
  const { onSignOut } = props;

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

    </div>
  );
}
