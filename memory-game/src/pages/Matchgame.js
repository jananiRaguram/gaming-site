import React, { useEffect, useRef  } from 'react';
import '../styles/match.css';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Matchgame = () => {
  const location = useLocation();
  const toastDisplayedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const username = params.get('username');

    if (username && !toastDisplayedRef.current) {
      // Display the toast notification
      toast.success(`Welcome to our game, ${username}!`);
      toastDisplayedRef.current = true;
    }
  }, [location.search]);

  return (
    <div className="big-panel container">
      <div className="main-content">
        <h1>Memory Match Up</h1>
        <p>Match the cards with the least amount of moves!</p>
        <div className="button-container">
          <button type="button" className="btnclass"><Link to="/instructions" className="linkclass">Instructions</Link></button>
          <button type="button" className="btnclass"><Link to="/cardSelection" className="linkclass">Start</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Matchgame;
