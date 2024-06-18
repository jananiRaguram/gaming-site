import '../../../styles/endgame.css';
import '../../../styles/buzz.css';
// import {MovesEndGame} from '../../../components/Counter';
import '../../../styles/buzzgame.css';
import Confetti from 'react-confetti'
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import { Button, Container } from 'react-bootstrap';

const BuzzEndgame = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  const panelRef = useRef(null);
  const [width, setPanelWidth] = useState(null);
  const [height, setPanelHeight] = useState(null);
  const { state } = useLocation();
  const userPoints = state ? state.userPoints : 0;
  const anagram = state ? state.anagram : '';
  const rank = state ? state.rank : 'Novice Forager'; // Default to 'Novice Forager' if rank is not provided in the state


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
            console.log("Data to be sent to /buzzgame_stats:", { username: userData.user.username || '', userPoints: userPoints,  userRank: rank, anagram: anagram });
            // Send game statistics to the backend when component unmounts (game ends)
            await $.ajax({
              type: 'POST',
              url: `${apiUrl}/buzzgame_stats`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              // If the username is empty, send an empty string
              data: JSON.stringify({ username: userData.user.username || '', userPoints: userPoints, userRank: rank, anagram: anagram }),
              contentType: 'application/json',
            });        
           
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
            fetchData();
  }, [userPoints, rank, anagram, apiUrl]);

  const navigateToGameStats = () => {
    navigate("/game-stats");
  };
  
  return (
      <Container className="big-panel main_container position-relative buzz-img" ref={panelRef}>
        <Confetti
          width={width}
          height={height}
          recycle={false}
        />
        <div className="main-content">
          <h1 style={{marginBottom:"20px"}}>Congratulations!</h1>
          <h5 style={{fontWeight: "normal"}}>You achieved a rank of <b>{rank}</b>, with a score of <b>{userPoints} points </b> in 3 minutes!</h5>
        </div>
        
        <div className='end-btns'>
          <Button className="btnclass play-again"><Link to="/buzzwords" className="linkclass">Start Over</Link></Button>
          <Button className="btnclass statsBtn" onClick={navigateToGameStats}>Stats</Button>
        </div>
      </Container>
  ); 
};

export default BuzzEndgame;
