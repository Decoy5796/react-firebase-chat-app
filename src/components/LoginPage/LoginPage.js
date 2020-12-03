import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase.js';

function LoginPage() {
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorFromSubmit(err.message);
      setLoading(false);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name='email'
          type='email'
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p className='warning-cap'>This field is required</p>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <p className='warning-cap'>Not email form</p>
        )}

        <label>Password</label>
        <input
          name='password'
          type='password'
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p className='warning-cap'>This field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p className='warning-cap'>
            Password must have at least 6 characters
          </p>
        )}

        {errorFromSubmit && <p className='warning-cap'>{errorFromSubmit}</p>}
        <input type='submit' disabled={loading} />
      </form>
      <Link
        to='register'
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '30px',
          cursor: 'pointer',
        }}
      >
        회원가입
      </Link>
    </div>
  );
}

export default LoginPage;
