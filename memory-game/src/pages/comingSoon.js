import '../styles/general.css';
import React, { useState, useRef } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'; // For the lock 

function ComingSoon() {
  const [checked, setChecked] = useState(false);

  const randomposition0 = useRef({
    position: 'absolute',
    top: String(Math.random() * (100 - 50) + 70)+ "vh",
    left: '60%',
    zIndex: -1,
    transform: 'translate(-50vh, -50vh)'
  });

  const randomposition1 = useRef({
    position: 'absolute',
    top:  "130vh",
    left: '60%',
    zIndex: -1,
    transform: 'translate(-50vh, -50vh)'
  });

  const randomposition2 = useRef({
    position: 'absolute',
    top: String(Math.random() * (100 - 50) + 70)+ "vh",
    right: '40%',
    zIndex: -1,
    transform: 'translate(-50vh, -50vh)'
  });

  const changeOpacity = (isChecked) => {
    const homepanel = document.querySelector('.homepaneldisplay2');
    if (isChecked) {
      homepanel.style.opacity = '50%';
    } else {
      homepanel.style.opacity = '100%';
    }
    setChecked(isChecked);
  };

  return (
    <>
      <div className="homepaneldisplay container" style={{height: "90vh"}}>
        <div className='toggle'>
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant="light"
            checked={checked}
            value="1"
            onChange={(e) => changeOpacity(e.currentTarget.checked)}
          >
          <FontAwesomeIcon icon={faLightbulb} />
          </ToggleButton>
        </div>
        <div className="homepaneldisplay2">
          <h1>!!!!!Coming Soon</h1>
          <h1>Coming Soon</h1>
          <h1 className="hiddentext">Next Clue: Get In Touch With Us!</h1>
          <h1>Coming Soon!!!!!</h1>
          {/* I is the correct letter to find here */}
          <h2 className="key-hidden" style={randomposition0.current}>I</h2> 
          <h2 className="key-hidden" style={randomposition1.current}>E</h2>
          <h2 className="key-hidden" style={randomposition2.current}>S</h2>
        </div>
      </div>

    </>
  );
}




export default ComingSoon;