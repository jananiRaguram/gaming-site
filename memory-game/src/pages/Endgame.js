import '../styles/endgame.css';
import {Counter, MovesEndGame} from '../components/Counter';
import Confetti from 'react-confetti'
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';

const Endgame = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  const panelRef = useRef(null);
  const [width, setPanelWidth] = useState(null);
  const [height, setPanelHeight] = useState(null);
  const { state } = useLocation();
  const moveCount = state ? state.moveCount : 0;
  const timer = state ? state.timer : 0;
  const deckTheme = state ? state.selectedTheme : "";
  const deckSize = state ? state.totalCards : 0;

  const navigate = useNavigate();

  //calculate size of game container to only show confetti there
  useEffect(() => {
    if (panelRef.current) {
      const width = panelRef.current.clientWidth;
      const height = panelRef.current.clientHeight;
      setPanelWidth(width);
      setPanelHeight(height);
    }
        // Update fetchData function in Gamestats component
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            let userData = { user: { username: '' } }; // Default username is an empty string
        
            if (token) {
              // Fetch user information using token
              userData = await $.ajax({
                type: 'GET',
                url: `${apiUrl}/user_info`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
        
            // Send game statistics to the backend when component unmounts (game ends)
            if (moveCount > 0) {
              await $.ajax({
                type: 'POST',
                url: `${apiUrl}/gamestats`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                // If the username is empty, send an empty string
                data: JSON.stringify({ username: userData.user.username || '', moves: moveCount, timer: timer, theme: deckTheme, size: deckSize }),
                contentType: 'application/json',
              });
            }
        
           
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
            fetchData();
  }, [moveCount, timer, deckTheme, deckSize, apiUrl]);

  const navigateToGameStats = () => {
    navigate("/game-stats");
  };

  return (
    <div className="frame">            
      <div className="big-panel position-relative container" ref={panelRef}>
        <Confetti
          width={width}
          height={height}
          recycle={false}
        />
        <div className="main-content">
          <h1>Congratulations!</h1>
          <p>You've successfully matched all the cards in {timer} seconds with {moveCount} moves!</p>
        </div>
        <div className="row">
          <div className='col'>
            <Counter count={timer} type='Time'/>
          </div>
          <div className='col'>
            <MovesEndGame count={moveCount} type='Moves'/>
          </div>
        </div>
        <div className='end-btns'>
          <button type="button" className="btnclass play-again"><Link to="/matchgame" className="linkclass">Start Over</Link></button>
          <button type="button" className="btnclass statsBtn" onClick={navigateToGameStats}>Stats</button>
        </div>
      </div>
    </div>
  ); 
};

export default Endgame;
