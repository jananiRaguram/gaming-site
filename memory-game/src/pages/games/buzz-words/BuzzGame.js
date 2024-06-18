import React, { useState, useEffect } from 'react';
import '../../../styles/match.css';
import '../../../styles/buzz.css';
import '../../../styles/buzzgame.css';
import '../../../styles/word_chart.css';
import anagramData from '../../../assets/anagrams.json';
import { Counter } from '../../../components/Counter';
import { useWordChecker } from 'react-word-checker';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";
import BuzzWordButton from './BuzzWordButton';
import { Row, Col, Container, Button } from 'react-bootstrap';


const BuzzWordsGame = () => {
    const location = useLocation();
    const selectedDifficulty = location.state ? location.state.difficulty : "Normal"; // Default theme
    const [anagrams, setAnagrams] = useState([]);
    const [anagram, setAnagram] = useState('');
    const [word, setWord] = useState('');
    const [resetButton, flipResetButton] = useState(false);
    const { wordExists } = useWordChecker("en");
    const [moveCount, setMoveCount] = useState(0);
    const [userPoints, setuserPoints] = useState(0); 
    const [timeRemaining, setTimeRemaining] = useState(180); // 3 minute
    const [usedWords, setUsedWords] = useState(new Set());
    const [notification, setNotification] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setAnagrams(anagramData.anagrams);
    }, []);

    // select a random anagram from the list of anagrams
    useEffect(() => {
        // check to make sure that there is a list of anagrams in anagrams and only then find a random index
        if (anagrams.length > 0) {
            // get random index using math floor based on the anagrams length
            setAnagram(anagrams[Math.floor(Math.random() * anagrams.length)]);
        }
    }, [anagrams]);

    //Timer to redirect game after 3 minutes
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate("/buzzwords-gameover", { state: { userPoints, moveCount, anagram, rank: calculateRank(userPoints) } });
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
      }, [navigate, userPoints, moveCount, anagram]);

    // funtion adds letter to word when user clicks a letter
    function addLetterToWord(letter) {
        // update setWord with the letter
        setWord(prevWord => prevWord + letter);
    }

    const handleDelete = () => {
        setWord(prevWord => prevWord.slice(0, -1));
    }


    const handleSubmit = () => {
    // clear notification for animation to work again
    // do this at the start so that the notification is still displayed when function returns early
      setTimeout(() => {
        setNotification('');
      }, 1500); 
      if (word.length === 0) {
        setNotification('Cannot submit an empty word');
        return;
      }
    // Check if the selected difficulty is 'Hard' and if the word does not contain the letter with class type 'btnclass-hard'
    if (selectedDifficulty === 'Hard' && !word.includes(anagram[0].toUpperCase())) {
        setNotification('Word must contain the letter ' + anagram[0].toUpperCase() + '!');
        setWord('');
        return;
    }
      // Can't accept a word that has already been used
      if (usedWords.has(word)) {
        setNotification('You have already used this word');
        setWord('');
        flipResetButton(!resetButton);
        return;
      }
    
      // Alert the user to let them know that the word exists or not based on what they enter
      if (wordExists(word)) {
        var score = 0;
        // Count letter occurrences in the word
        // First occurrence of a letter is worth 2 points, subsequent occurrences are worth 1 point
        const letterOccurrences = {};
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          if (letterOccurrences[letter]) {
            letterOccurrences[letter]++;
            score += 1;
          } else {
            letterOccurrences[letter] = 1;
            score += 2;
          }
        }        
        // Correct words act as score for now
        setuserPoints(prevCount => prevCount + score); 
        setUsedWords(prevUsedWords => new Set(prevUsedWords).add(word));
    
        // Display notification for points
        setNotification(`+${score}!`);
      } else {
        // Display notification for wrong word
        setNotification('Not a valid word');
      }
    
     
    
      setMoveCount(prevMoveCount => prevMoveCount + 1); // Increment move count
      setWord('');

      // Reset all the button to be true again, basically flip them
      flipResetButton(!resetButton);
    };
    
    /* eslint-disable */
    useEffect(() => {
        //keyboard event listener
        const handleKeyDown = (event) => {
            if (event.key.match(/[a-zA-Z]/) && anagram.includes(event.key.toLowerCase())) {
                addLetterToWord(event.key.toUpperCase()[0]);
            }
            if (event.key === "Backspace") {
                handleDelete();
            }
            if (event.key === "Enter") {
                handleSubmit();
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [anagram, word]);
    /* eslint-enable */


     // To determine what rank the user gets based on their score
     const calculateRank = (score) => {
      if (score >= 100) {
          return 'Queen Bee'
      } else if (score >= 75) {
          return 'Expert Pollinator';
      } else if (score >= 50) {
          return 'Worker Bee'
      } else {
         return 'Novice Forager'
      }
    };

    // table to display all of the words plus rank
    const FoundWordsChart = () => {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>{calculateRank(userPoints)}: {userPoints} pts</th>
              </tr>
            </thead>
            <tbody>
              {[...usedWords].map((word, index) => (
                <tr key={index}>
                  <td>{word}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
  return (
    <Container className="big-panel main_container buzz-img" style={{padding:"unset"}}>
      
      <Row className="main-content aligcontent">
        <Row className="near-top">
          <Col className='align-self-center d-flex justify-content-center'>
            <div className='found-words-chart'>
              <FoundWordsChart />
            </div>
          </Col>
          
          <Col className='align-self-center d-flex justify-content-center'>
            <Counter count={timeRemaining} type='Time'/>
          </Col>
        </Row>
        <Row className='notif-row'>{notification && <p className={`notification ${notification.includes('+') ? 'success-message' : 'error-message'}`}>{notification}</p>}</Row>

        <Row className='word-row'>
            <h1 className='game-title'>
                {word.split("").map((letter, index) => (
                    <span key={index} className="title-letter">{letter}</span>
                ))}
            </h1>
        </Row>

        {/* anagram letters */}
        {/* {selectedDifficulty === 'Hard' && <p>Hard</p>} */}
        <Row>
        
        <Col className='aligcontent'>
            {/* split the anagram based on each letter, then map each letter and get each letter from the anagram, cycle through each letter and create a button related to that letter */}
            {anagram.split("").map((letter, i) => (
                <BuzzWordButton
                    className='s'
                    letter={letter.toUpperCase()}
                    addLetterToWord={addLetterToWord}
                    // if the selected difficulty is hard and the first letter is the first letter of the anagram, then add a class to the button
                    classType={selectedDifficulty === 'Hard' && i === 0 ? 'btnclass-hard' : 'btnclass'}
                />
            ))}
        </Col>

        </Row>
        <Row className='aligcontent' style={{ columnGap: "20px" }}>
          <Col>
            <Button className="btnclass" onClick={handleDelete}>Delete</Button>
          </Col>
          <Col style={{ display: "flex" }}>
            <Button className="btnclass" onClick={handleSubmit}>Submit</Button>
          </Col>
        </Row>

      </Row>
    </Container>
  );
};

export default BuzzWordsGame;
