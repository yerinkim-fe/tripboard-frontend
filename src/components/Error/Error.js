import React, { useEffect } from 'react';
import './Error.scss';

export default function Error(props) {
  const { message } = props;

  useEffect(() => {

  }, [message]);

  return (
    <div className='error'>
      <p className='error-message'>{message}</p>
    </div>
  );
}
