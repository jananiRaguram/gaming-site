import React from 'react';
import '../../../styles/match.css';
import '../../../styles/buzz.css';
import '../../../styles/wordsearch.css';

import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const WordSearchStart = () => {
  return (
    <Container className="big-panel wordgame-img" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
      <div className="main-content">
        <h1 className='game-title'>
            <span>Word Search</span>
        </h1>
        <p>Find all the words hidden in plain sight</p>
        <div className="button-container col-6 mx-auto">
          <Button className="btnclass"><Link to="/wordsearch-instructions" className="linkclass">Instructions</Link></Button>
          <Button className="btnclass"><Link to="/wordsearch-selection"  className="linkclass">Start</Link></Button>
        </div>
      </div>
    </Container>
  );
};

export default WordSearchStart;
