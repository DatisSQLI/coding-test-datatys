import React from 'react';
import './auth.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../tools/api';

function AuthPage() {
  const {
    register, handleSubmit, setError, formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/user/auth', { email, password });
      console.log(data);
      navigate('/profile', { state: { user: data } });
    } catch (e) {
      console.log(e);
      setError('root', e.message);
    }
  };

  return (
    <div id="auth-layout">
      <div id="auth-left-panel">
        BlueTrust Monitoring
      </div>
      <form id="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <label htmlFor="auth-email">
          <span>Email</span>
          <input {...register('email')} type="email" id="auth-email" />
        </label>

        <label htmlFor="auth-password">
          <span>Password</span>
          <input {...register('password')} type="password" id="auth-password" />
        </label>

        {errors.root && <small className="form-error" role="alert">{errors.root.message}</small>}
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default AuthPage;
