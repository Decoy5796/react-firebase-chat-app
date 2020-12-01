import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const password = useRef();
  const { register, watch, errors } = useForm({ mode: 'onChange' });

  password.current = watch('password');
  console.log(watch('email'));

  return (
    <div className='auth-wrapper'>
      <div>
        <h3>Register</h3>
      </div>
      <form>
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

        <label>Name</label>
        <input name='name' ref={register({ required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === 'required' && (
          <p className='warning-cap'>This field is required</p>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <p className='warning-cap'>
            Password must have at least 6 characters
          </p>
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

        <label>Password Confirm</label>
        <input
          name='password_confirm'
          type='password'
          ref={register({
            required: true,
            validate: (val) => val === password.current,
          })}
        />
        {errors.password_confirm && errors.password_confirm === 'required' && (
          <p className='warning-cap'>This field is required</p>
        )}
        {errors.password_confirm && errors.password_confirm === 'validate' && (
          <p className='warning-cap'>The passwords do not match</p>
        )}

        <input type='submit' />
      </form>
      <Link
        to='login'
        style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '30px',
          cursor: 'pointer',
        }}
      >
        로그인
      </Link>
    </div>
  );
}

export default RegisterPage;
