import React, { useEffect, useState, useRef } from "react";
import {Link, useNavigate, useLocation } from "react-router-dom";
import MatchCard from "../components/card";
import '../styles/game.css';
import {Counter} from '../components/Counter';
import {Row, Col, Container} from 'react-bootstrap';

function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const totalCards = location.state ? location.state.numCards : 8; //default to 8
    const selectedTheme = location.state ? location.state.theme : "Animals"; //default to landscapes 

    //get images based on selected theme
    let imagesFolder = '';
    if (selectedTheme === "Halloween"){
        imagesFolder = "halloween";
    }else if (selectedTheme === "Logos"){
        imagesFolder = "logos";
    }else if (selectedTheme === "Landscapes"){
        imagesFolder = "landscapes";
    } else {
        imagesFolder = "animals";
    }

    const uniqueCardsArray = Array.from({ length: totalCards / 2 }, (_, index) => {
        //Files named 1,2,3... 
        let imageName = '';
        if (selectedTheme === "Logos") {
            imageName = `${index + 1}.jpg`; //only logos have jpg
        }else {
            imageName = `${index + 1}.svg`; //for svg 
        }
       
        return {
            name: imageName,
            image: require(`../images/${imagesFolder}/${imageName}`)
        };
    });
    
    // shuffling cards for user
    function shuffleDeck(array) {
        // creates doubles
        array = array.concat(array)
        // common shuffle algorithm
        for (let i = array.length; i > 0; i--) {
            var current = i - 1;
            // get random index
            var random = Math.floor(Math.random() * i);
            // swap card into random index 
            var temp = array[current];
            array[current] = array[random];
            array[random] = temp;
        }
        return array;
    }

    const totalPairs = totalCards / 2;

    // setup variables
    const [cards, setCards] = useState(() =>
        shuffleDeck(uniqueCardsArray.slice(0, totalPairs))
    );
    const [flippedCards, setflippedCards] = useState([]);
    const [matchedCards, setmatchedCards] = useState([]);
    const timeout = useRef(null);
    const [moveCount, setMoveCount] = useState(0);
    const [timer, setTimer] = useState(0);

    // useeffect for timer
    useEffect(() => {
        // setting the timer the game based on when the screen loads
        const totalTime = setInterval(() => {
            // increase the timer by 1 
            setTimer(prev => prev + 1);
        }, 1000);
        return () => clearInterval(totalTime);
      }, []);

    // function to flip card
    const handleCardClick = (index) => {
        // add first card to flipped cards 
        if (flippedCards.length !== 2) {
            if (flippedCards.length !== 1) {
                setflippedCards([index]);
            } else {
                // add second card to flipped cards
                setflippedCards((prev) => [...prev, index]);
                setMoveCount((prevMoveCount) => prevMoveCount + 1); // Update move count
            }
        }
    };


    const checkMatch = () => { 
        const [first, second] = flippedCards;

        if (cards[first].name === cards[second].name) { // checks if flipped cards are matching
            setmatchedCards((prev) => ([...prev, cards[first].name])); // if the cards are matching then add to match cards 
            setflippedCards([]); // empty flipped cards
            return;
        }
        timeout.current = setTimeout(() => {
            setflippedCards([]); // if matched cards stay visible for this long
        }, 400);
    };

    useEffect(() => {
        if (flippedCards.length > 1) { // check if two cards are flipped
            timeout.current = setTimeout(() => { // if they are not a match then in this much time unflip them again
                checkMatch();
            }, 600);
        }
   
        //Checking if the game is over and all cards matched
        if (matchedCards.length === totalPairs) {
            navigate("/gameover", { state: { moveCount, timer, selectedTheme, totalCards } });
        }
   
        return () => {
            clearTimeout(timeout.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flippedCards, matchedCards, navigate, totalPairs]);

    const checkIsFlipped = (index) => { // checking if card is flipped using index   
        return flippedCards.includes(index); 
    };

    const checkIsInactive = (card) => { // checking if card has been matched
        return matchedCards.includes(card.name);
    };

    const restart = () => { // function restart game based on button click
        setmatchedCards([]); // reset the set match card array
        setflippedCards([]); // reset the flipped card array
        setCards(shuffleDeck(uniqueCardsArray.slice(0, totalPairs))); // shuffle the array again
        setMoveCount(0); // reset move counter and timer
        setTimer(0);
    };

    return (
        // create grid with nested rows 
        // top row for header, back, restart,
        // bottom row for nested nested rows for cards and either side has moves, timer
        <Container className="main_container justify-content-center">
            <Row className="justify-content-around" style={{ padding: '20px' }}>
                <Col className='align-self-center d-flex justify-content-center'>
                    <button type="button" className="btnclass restart">
                        <Link to="/cardSelection" className="linkclass">Back</Link>
                    </button>
                </Col>
                <Col className='align-self-center'>
                    <h2 className="text-dark">{selectedTheme} Match Up</h2>
                </Col>
                <Col className='align-self-center d-flex justify-content-center'>
                    <button onClick={restart} className="btnclass restart">
                        Restart
                    </button>
                </Col>
            </Row>
            {/* bottom row */}
            <Row>
                <Col> 
                {/* dynamically create columns of cards with breakpoints for screensizes */}
                    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {cards.map((card, index) => (
                            <Col key={index} xs={6} sm={6} md={3} lg={3} xl={3} className="d-flex">
                                <MatchCard
                                    onClick={handleCardClick}
                                    card={card}
                                    index={index}
                                    isInactive={checkIsInactive(card)}
                                    isFlipped={checkIsFlipped(index)}
                                    updateMoveCount={setMoveCount}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            {/* Bottom row for timer and counter */}
            <Row className="justify-content-center">
                <Col xs="auto" className="d-flex flex-column justify-content-center align-items-center">
                    <Row>
                        <Col xs="auto">
                            <Counter count={timer} type='Time'/>
                        </Col>
                        <Col xs="auto">
                            <Counter count={moveCount} type='Moves'/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );    
}

export default Game;
