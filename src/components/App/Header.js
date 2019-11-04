import React, { useState, useEffect } from 'react';

export default function TripNew(props) {
  const { title, history } = props;

  const handleBack = () => {
    history.goBack();
  }

  return (
    <header>
      <h1>{title}</h1>
      <button type='button' onClick={handleBack}>←</button>
    </header>
  );
}
