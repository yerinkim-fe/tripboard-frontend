import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { normalizeEmail, isLength } from 'validator';
import Error from '../../Error/Error';
import './SignIn.scss';

export default function SignIn(props) {
  const { onSignIn, errorMessage } = props;
  const [ error, setError ] = useState('');

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const [userInput, setUserInput] = useReducer((state, newState) => ({...state, ...newState}), {
    email: '',
    password: ''
  });

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;
    setUserInput({ [name]: newValue });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!userInput.email) {
      setError('email을 입력해주세요.');
      return false;
    }
    if (!userInput.password) {
      setError('password를 입력해주세요.');
      return false;
    }

    if (!normalizeEmail(userInput.email)) {
      setError('잘못된 이메일 형식입니다.');
      return false;
    }

    if(!isLength(userInput.password, { min: 6 })) {
      setError('비밀번호를 6자 이상 입력하세요.');
      return false;
    }

    const user = {
      email: userInput.email,
      password: userInput.password
    };

    onSignIn(user);
  };

  return (
    <div className='signin'>
      <div className='auth'>
        <h1>TRIP BOARD</h1>
        <p className='desc'>Manage your trip</p>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={userInput.email}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            value={userInput.password}
            onChange={handleChange}
          />

          <input type='submit' value='SIGN IN' />
        </form>

        <p className='account'>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>


        {
          error &&
          <Error
            message={error}
          />
        }

      </div>
      {/* <div className='earth'></div> */}

    </div>
  );
}
