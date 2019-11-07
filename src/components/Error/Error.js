import React, { useEffect } from 'react';
import './Error.scss';

export default function Error(props) {
  const { message } = props;

  useEffect(() => {
// setTimeout(() => setCopySuccess(false), 1000);
  }, [message]);

  return (
    <div className='error'>
      <p className='error-message'>{message}</p>
    </div>
  );
}
