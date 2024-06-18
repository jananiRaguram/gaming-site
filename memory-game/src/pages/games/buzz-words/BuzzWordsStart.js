import React from 'react';
import '../../../styles/match.css';
import '../../../styles/buzz.css';
import '../../../styles/game.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const BuzzWordsStart = () => {
  return (
    <Container className="big-panel main_container buzz-img">
      <div className="main-content">
        <h1 className='game-title'>
          { "BuzzWords".split("").map((letter, index) => (
            <span key={index} className="title-letter">{letter}</span>
          ))}
        </h1>
        <p>Become the queen bee by spelling the most words!</p>
        <div className="button-container col-6 mx-auto">
          <Button className="btnclass"><Link to="/buzzwords-instructions" className="linkclass">Instructions</Link></Button>
          <Button className="btnclass"><Link to="/buzzwords-selection" className="linkclass">Start</Link></Button>
        </div>
      </div>
    </Container>
  );
};

export default BuzzWordsStart;
