import '../styles/general.css';
import matchImage from '../images/Frame_7.png';
import newGameImage from '../images/new_game.png';
import spellingBeeGameImage from '../images/bee.png';
import wordsearchImage from '../images/Frame13.png';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from '../components/GameCard';
import { HiddenEasterEgg } from "react-hidden-easter-egg";
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';

function Home() {
  // regular background
  const [color, setColor] = useState({background: '#333333'})
  // navigate function to move to game page
  const navigate = useNavigate();
  // description for match game
  const desc = (
    'Flip and match pairs of cards in a race against time. Sharpen your memory skills ' +
    'and enjoy the timeless fun of this classic game. Please Sign up/Log in to save your ' +
    'score with your username!'
  ); 
  
  const descSpelling = (
    'Test you spelling skills by trying to form the most words with the letters you have!'
  ); 

  const descWordSearch = (
    'Unleash your word-finding skills in our new word search game! ' +
    'Hunt for hidden words in themed grids and try to beat the clock'
  ); 

  // redirect to match game
  const redirectMatchGame = () => {
      navigate("/matchgame");
  };

  const redirectComingSoon = () => {
    navigate("/comingsoon");
  };

  const redirectBuzzWords = () => {
    navigate("/buzzwords-start");
  };

  const redirectWordSearch = () => {
    navigate("/wordsearch-start");
  };


  const typedClue = () => {
    toast("Log or learn more about what's next");
    console.log("Remember this: T");
  }

  return (
    <>
      <Container className="homepaneldisplay" style={color}>
        <h1>Games</h1>
        <div className="rowdisplay" >
          {/* sending in variables for card component */}
          <div className='gc'>
            <GameCard 
              title= 'Memory Match Up' 
              desc={desc}             
              buttonText= 'Play Memory Match Up 🐇' 
              image= {matchImage}
              redirect= {redirectMatchGame}
              setcolor= {setColor}
            />
          </div>

          <div className='gc'>
            <GameCard 
              title= 'Buzz Words' 
              buttonText= 'Play Buzz Words' 
              desc = {descSpelling}
              image= {spellingBeeGameImage}
              redirect= {redirectBuzzWords} //change to the starting page 
              setcolor= {setColor}
            />
          </div>
           {/* duplicate card component for coming soon games */}
            
          {/* duplicate card component for wordsearch */}
          <div className='gc'>
            <GameCard 
              title= 'Word Search' 
              buttonText= 'Play Word Search' 
              desc = {descWordSearch}
              image= {wordsearchImage}
              redirect= {redirectWordSearch} 
              setcolor= {setColor}
            />
          </div>
          
          {/* duplicate card component for coming soon games */}
          <div className='gc'>
            <GameCard 
              title= 'Coming Soon' 
              desc= 'New game coming soon. Stay tuned to find out more!'
              buttonText= 'Learn More' 
              image= {newGameImage}
              redirect= {redirectComingSoon}
              setcolor= {setColor}
            />
          </div>
        </div>
      </Container>
      <br/>
      <br/>
      <br/>
      <text>type           c    l    u    e</text>
      <HiddenEasterEgg code={['c', 'l', 'u', 'e']} resetEggMs={1000} cb={() =>  typedClue()}/>
    </>
  );
}

export default Home;
