import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_USER } from '../utils/mutations';

import { useCurrentUserContext } from '../context/CurrentUser';

export default function Login() {
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });


  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const { token, currentUser } = mutationResponse.data.login;
      loginUser(currentUser, token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };


  return (
    <>
      {error ? (
        <div>
          <p>The provided credentials are incorrect</p>
        </div>
      ) : null}

      <h1>Crepes By Carmen</h1>
      <form
        id="login-form"
        onSubmit={handleFormSubmit}
      >
        <div>
          <h2>Welcome Back!</h2>
          <h3>Log in to your account</h3>
        </div>
        <label htmlFor="email">
          Email:
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          Login
        </button>

        <p>
          Need an account?{' '}
          <Link to="/register">
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
}
