import '../styles/movecounter.css';
import React from 'react';

const Counter = ({ count, type }) => {
  return (
    <div className="move-counter-container">
      <span className={`dot-${type}`}>{type}<br />{count}</span>
    </div>
  );
};

const MovesEndGame = ({ count, type }) => {
  return (
    <div className="move-counter-container">
      <span className={`dot-Time`}>{type}<br />{count}</span>
    </div>
  );
};


export {Counter, MovesEndGame};
