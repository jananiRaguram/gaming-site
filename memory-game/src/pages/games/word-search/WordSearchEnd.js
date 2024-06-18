import '../../../styles/endgame.css';
import Confetti from 'react-confetti'
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WordSearchEnd = () => {
  const panelRef = useRef(null);
  const [width, setPanelWidth] = useState(null);
  const [height, setPanelHeight] = useState(null);

  const location = useLocation();
  let finishedTime = location.state ? location.state.finishedTime : 0;
  const selectedTheme = location.state ? location.state.theme : "Normal"; // Default theme
  const numFoundWords = location.state ? location.state.numFoundWords : 0;


  if(finishedTime === 0){
    finishedTime = 180;
  }else{
    finishedTime = 180 - finishedTime;
  }

  //calculate size of game container to only show confetti there
  useEffect(() => {
    if (panelRef.current) {
      const width = panelRef.current.clientWidth;
      const height = panelRef.current.clientHeight;
      setPanelWidth(width);
      setPanelHeight(height);
    }
       
  },[]);

  return (
    <div className="frame">            
      <div className="big-panel position-relative container wordgame-img" ref={panelRef}>
        <Confetti
          width={width}
          height={height}
          recycle={false}
        />
        <div className="main-content">
          <h1 style={{marginBottom:"20px"}}>Congratulations!</h1>
          {selectedTheme === 'Normal' && (
            <p>You've found all the words!</p>
          )}
          
          {selectedTheme === 'Blitz' && (
            <p>You've found {numFoundWords} words in {finishedTime} seconds</p>
          )}
          
        </div>
        
        <div className='end-btns'>
          <button type="button" className="btnclass play-again"><Link to="/wordsearch-start" className="linkclass">Start Over</Link></button>
        </div>
      </div>
    </div>
  ); 
};

export default WordSearchEnd;
