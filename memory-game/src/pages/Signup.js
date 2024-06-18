import React, { useState } from 'react';
import '../styles/general.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();
  // RUN THS LOCALLY local dev: export REACT_APP_API_URL=http://localhost:8000
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  console.log(apiUrl)

  function useHover() {
    const [hover, setHoverInfo] = useState(false)
    const hoverInfo = {
      onMouseEnter: () => setHoverInfo(true),
      onMouseLeave: () => setHoverInfo(false),
    }
    return [hover, hoverInfo] 
  }



  const [title, setTitle] = useHover();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // Try to register the user using data inputted
    try {
      const response = await fetch(`${apiUrl}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        const data = await response.json();

        // Fetch user information using the token
        localStorage.setItem('token', data.token);
        const userResponse = await fetch(`${apiUrl}/user_info`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          // Navigate to match game page after successful registration
          history(`/?username=${userData.user.username}`);
        } else {
          console.error('Error fetching user information:', userResponse.statusText);
        }
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <body>
        <div>
          <h1 className="titletransition" {...setTitle} >
            {title ? "What makes a car run?" : "Create an Account"}
          </h1>
        </div>
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input placeholder="Username" type="text" name="username" className="form-control" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                required
                placeholder="name@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder="Password" type="password" name="password" className="form-control" id="Password" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </form>
        </div>
      </body>
    </>
  );
};

export default Signup;
