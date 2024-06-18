import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import '../styles/gamestats.css';


const Gamestats = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedLeaderboard, setSelectedLeaderboard] = useState('memory'); // Default to memory game leaderboard
  const location = useLocation();
  const moveCount = location.state ? location.state.moveCount : 0;
  const timer = location.state ? location.state.timer : 0;
  const deckTheme = location.state ? location.state.selectedTheme : "";
  const deckSize = location.state ? location.state.totalCards : 0;

  useEffect(() => {
    // Get user information
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        let userData = { user: { username: '' } };

        if (token) {
          userData = await $.ajax({
            type: 'GET',
            url: `${apiUrl}/user_info`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setUsername(userData.user.username || '');

        // This lets us determine what leaderboard API to call from the backend
        let leaderboardUrl;
        if (selectedLeaderboard === 'memory') {
          leaderboardUrl = `${apiUrl}/leaderboard`;
        } else if (selectedLeaderboard === 'buzzwords') {
          leaderboardUrl = `${apiUrl}/buzzgame_leaderboard`;
        }

        // Fetch leaderboard data based on selected option
        const leaderboardData = await $.ajax({
          type: 'GET',
          url: leaderboardUrl,
        });
        setLeaderboardData(leaderboardData);
      } catch (error) {

        console.error('Error:', error);
      }
    };

    fetchData();
  }, [moveCount, timer, deckTheme, deckSize, apiUrl, selectedLeaderboard]);

  const handleLeaderboardChange = (event) => {
    setSelectedLeaderboard(event.target.value);
  };

  return (
    <div className=''>
      <div className='main-content main-panel'>

        <div className='top row'>
          
          <div className='title col'>
            <h3>LEADERBOARD</h3>
            {selectedLeaderboard === 'memory' && (
              <p>Top 10 players with the fewest moves</p>
            )}

            {selectedLeaderboard === 'buzzwords' && (
              <p>Top 10 players with the most points</p>
            )}
          </div>

          <div className="custom-select-wrapper ">
            {/* Combo-box for the two different leaderboard options */}
            <select value={selectedLeaderboard} onChange={handleLeaderboardChange} className='custom-select'>
              <option value="memory">Memory Match Up</option>
              <option value="buzzwords">Buzz Words</option>
            </select>
          </div>

        </div>
        {/* Render table for Memory Match up */}
        {selectedLeaderboard === 'memory' && (
          <div className='table-panel'>
            <table className="table table-striped">
              {/* Table headers */}
              <thead>
                <tr className="title-row">
                  <th scope="col"></th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Time (sec)</th>
                  <th scope="col">Moves</th>
                  <th scope="col">Theme</th>
                  <th scope="col">Size</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {/* Map through leaderboardData and render rows */}
                {leaderboardData.map((data, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    {/* If the current user is viewing the table, we append (You) to the username field */}
                    <td>{data.username === username ? `${data.username} (You)` : data.username}</td>
                    <td>{data.timer}</td>
                    <td>{data.moves}</td>
                    <td>{data.theme}</td>
                    <td>{data.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render table for Buzz Words */}
        {selectedLeaderboard === 'buzzwords' && (
          <div className='table-panel'>
            <table className="table table-striped">
              {/* Table headers */}
              <thead>
                <tr className="title-row">
                  <th scope="col"></th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Points</th>
                  <th scope="col">Rank</th>
                  <th scope="col">Anagram</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {/* Map through leaderboardData and render rows */}
                {leaderboardData.map((data, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{data.username === username ? `${data.username} (You)` : data.username}</td>
                    <td>{data.userPoints}</td>
                    <td>{data.userRank}</td>
                    <td>{data.anagram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gamestats;
