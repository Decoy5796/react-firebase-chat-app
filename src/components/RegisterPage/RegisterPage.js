import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div class="auth-wrapper">
      <div>
        <h3>Register</h3>
      </div>
      <form>
        <label>Email</label>
        <input
          name="email"
          type="email"
          // ref={register({ required: true, maxLength: 10 })}
        />

        <label>Name</label>
        <input
          name="name"
          // ref={register({ required: true, maxLength: 10 })}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          // ref={register({ required: true, maxLength: 10 })}
        />

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          // ref={register({ required: true, maxLength: 10 })}
        />

        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input type="submit" />
      </form>
      <Link
        to="login"
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
