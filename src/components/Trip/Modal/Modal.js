import React from 'react';
import './Modal.scss';

export default function Modal(props) {
  const { children, onHideModalClick } = props;

  return (
    <div className='modal'>
      <button type='button' onClick={onHideModalClick}>x</button>
      {children}
    </div>
  );
}
