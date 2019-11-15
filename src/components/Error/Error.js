import React from 'react';
import './Error.scss';

export default function Error(props) {
  const { message } = props;

  return (
    <div className='error'>
      <p className='error-message'>{message}</p>
    </div>
  );
}
