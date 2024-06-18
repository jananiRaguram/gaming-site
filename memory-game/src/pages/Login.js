import React, { useState } from 'react';
import '../styles/general.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // RUN THS LOCALLY local dev: export REACT_APP_API_URL=http://localhost:8000
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  console.log(apiUrl)

  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      // Send a login POST request to the backend
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the token the browser's local storage
        localStorage.setItem('token', data.token);
        // Ensure that the user can be authenticated
        const userResponse = await fetch(`${apiUrl}/get_token?email=${data.email}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          // Navigate to match game page after successful login
          history(`/?username=${userData.user.username}`);
        } else {
          console.error('Error fetching user information:', userResponse.statusText);
        }
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <body>
        <div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <h1>Sign in</h1>
        </div>
        <div className="form-container login">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                required
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                name="password"
                id="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </div>
      </body>
    </>
  );
};

export default Login;
