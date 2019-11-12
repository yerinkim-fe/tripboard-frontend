import React, { useState, useEffect, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../App/Header'
import { createUser } from '../../../api';
import { normalizeEmail, isLength } from 'validator';
import Error from '../../Error/Error';
import './SignUp.scss';

export default function SignUp(props) {
  const { errorMessage, history } = props;
  const [ signUpSuccess, setSignUpSuccess ] = useState(false);
  const [ error, setError ] = useState('');

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const [userInput, setUserInput] = useReducer((state, newState) => ({...state, ...newState}), {
    email: '',
    name: '',
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

    if (!userInput.name) {
      setError('name을 입력해주세요.');
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

    if (!isLength(userInput.name, { min: 1, max: 15 })) {
      setError('이름은 1~15 글자로 이뤄져야 합니다.');
      return false;
    }

    if(!isLength(userInput.password, { min: 6 })) {
      setError('비밀번호를 6자 이상 입력하세요.');
      return false;
    }

    const user = {
      email: userInput.email,
      name: userInput.name,
      password: userInput.password
    };

    const result = await createUser(user);

    if (result.status === 201) {
      setSignUpSuccess(true);
    } else {
      setError(result.data.message);
      setUserInput({
        email: '',
        name: '',
        password: ''
      });
    }
  };

  if (signUpSuccess) {
    return (
      <Redirect to='/signin' />
    )
  }

  return (
    <div className='signup'>
      <Header
        title='Sign up'
        history={history}
      />

      <div className='auth'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={userInput.email}
            onChange={handleChange}
          />
          <input
            type='text'
            name='name'
            placeholder='name'
            value={userInput.name}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            value={userInput.password}
            onChange={handleChange}
          />

          <input type='submit' value='등록' />
        </form>

        <p className='account'>Already have an account? <Link to={'/signin'}>Sign in</Link></p>

        {
          error &&
          <Error
            message={error}
          />
        }

      </div>
    </div>

  );
}
