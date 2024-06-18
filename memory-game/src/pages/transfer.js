import React, { useState, useEffect } from 'react';
import '../styles/general.css';
import '../styles/SolvedEnd.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'; 
import OldMan from '../images/old_man.png';
import { TypeAnimation } from 'react-type-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // For the lock 
import { useNavigate } from "react-router-dom";


const PasswordProtectedPage = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showRabbit, setShowRabbit] = useState(false);
  const [showMan, setShowMan] = useState(true);


  const navigate = useNavigate();

  const correctPassword = 'p8mU45McP';

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password === correctPassword) {
      setLoggedIn(true);
    } else {
      // Display toast notification
      toast.error('Wrong Key!', {
        autoClose: 3000 // Close the toast after 3 seconds
      });      
      setPassword('');
    }
  };

  // show button to continue near end of dialogue
  useEffect(() => {

    // delay based on length of typed text
    const delayTime = 55500;
    const delayTimeMan = 70000;
    const delayTimeHideRabbit = 54500;

    const timeout = setTimeout(() => {
      setShowButton(true);
      setShowRabbit(true);
    }, delayTime);

   
    const hideRabbitTimeout = setTimeout(() => {
      setShowRabbit(false);
    }, delayTimeHideRabbit);

    const hideMan = setTimeout(() => {
      setShowMan(false);
    }, delayTimeMan);
  
  
    return () => {
      clearTimeout(timeout); //clear for next time
      clearTimeout(hideMan); 
      clearTimeout(hideRabbitTimeout);
    };
  }, []);

  const sendHome = () => {
    navigate("/");
  };
  
  //used for styling callback
  const cursor = 'type'; 

  return (
    <body>
      {!loggedIn ? (
        <div>
          <h1>Enter the key</h1>
          <br />
          <div className="form-container login">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Key..."
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Get Access
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {/* Content to display after successful login */}
          <div className={`dialogue ${showMan ? '' : 'invisible'}`}>
            <img src={OldMan} alt='old man character' className='old-man'/>
              <div className='dialogue-container'>
                <TypeAnimation
                    sequence={[
                        (el) => el.classList.add(cursor),
                        'Oh my! Oh my!',
                        1000, //delay before typing again
                        'You\'ve startled me so!',
                        1200,
                        'I never expected anyone to come this way, you know.',
                        1200,
                        'This path, you see, I stumbled upon long ago, following a white rabbit I adored',
                        1200,
                        'It\'s a labyrinth of sorts, where I\'ve lost my way to and fro.',
                        1200,
                        'Many twists and turns, ',
                        1200,
                        'Many twists and turns, and things hidden in plain sight,', //continues
                        1250,
                        'But here\'s a little help from me', 
                        1200,
                        'The path to the end, where mysteries unfold, solve them, and the key you will hold',
                        1600,
                        'The key of lone letters to unviel the shift past /cipherDoor',
                        2000,
                        'I would come with you but - ',
                        1200,
                        'Is that my rabbit friend? ',
                        1200,
                        'Sorry I\'ve got to go',
                        1200,
                        'Good luck on your journey - but leave the doors open pretty please!',
                        (el) => el.classList.remove(cursor),
                    ]}
                    wrapper="span"
                    speed={48}
                    cursor={false}
                    style={{ fontSize: '2em', display: 'inline-block', color:'#31b231' }}
                    repeat={0}
                    omitDeletionAnimation={true}
                    className='type-theme'
                />
            </div>
          </div>
          <div className={`continue-button ${showButton ? 'visible' : ''}`}>
            <div className={`continue-button ${showRabbit ? 'visible' : ''}`}>🐇</div>
            <button type="submit" className="btn btn-primary" onClick={sendHome}>
                Continue  <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </body>
  );
};

export default PasswordProtectedPage;
