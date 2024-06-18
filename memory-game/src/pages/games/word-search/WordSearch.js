import React, { useState, useEffect, useCallback} from 'react';
import '../../../styles/match.css';
import '../../../styles/buzz.css';
import '../../../styles/wordsearch.css';
import foodWords from '../../../assets/wordsearch-categories/food.json';
import sportsWords from  '../../../assets/wordsearch-categories/sports.json'
import normalWords from  '../../../assets/wordsearch-categories/random.json'
import computingWords from  '../../../assets/wordsearch-categories/computing.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Counter } from '../../../components/Counter';
import { Row, Col, Container, Button } from 'react-bootstrap';

const WordSearch = () => {
    const location = useLocation();
    const selectedTheme = location.state ? location.state.theme : "Normal"; // Default theme
    const selectedCategory = location.state ? location.state.category : "Random"; // Default theme
    const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
    const [wordGrid, setWordGrid] = useState([]); // Grid for word search
    const [words, setWords] = useState([]); // Words to find
    const [reveal, setReveal] = useState(false); // State to track if user typed 'reveal'
    const [clickedCells, setClickedCells] = useState([]); // clicked cells on word grid
    const [foundWords, setFoundWords] = useState([]); 
    const [gameOver, setGameOver] = useState(false); //can't depend on timer for game over because it's being loaded and counts down during normal mode

    const navigate = useNavigate();

    // Function to place a word in the grid
    const placeWordInGrid = useCallback((word) => {
        let wordPlaced = false;
        while (!wordPlaced) {
            // Randomly choose orientation
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

            // Generate a random row index within the word grid
            const row = Math.floor(Math.random() * wordGrid.length);
            // Generate a random column index within the word grid
            const col = Math.floor(Math.random() * wordGrid[0].length);

            /* Check if the word can be placed horizontally/vertically without overflowing the grid:
              - orientation === 'horizontal': Ensures we're trying to place the word horizontally.
              - col + word.length <= wordGrid[0].length: Checks if the word, starting from the chosen column index `col`,
                fits within the grid horizontally without overflowing the grid boundaries. */
            if (orientation === 'horizontal' && col + word.length <= wordGrid[0].length) {
                let canPlace = true;
                // Check if word can be placed horizontally
                for (let i = 0; i < word.length; i++) {
                    if (wordGrid[row][col + i] !== '') {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        // Place word
                        wordGrid[row][col + i] = { letter: word[i], isCorrect: true, isClicked: false, word};
                    }
                    wordPlaced = true;
                }
            } else if (orientation === 'vertical' && row + word.length <= wordGrid.length) {
                let canPlace = true;
                // Check if word can be placed vertically
                for (let i = 0; i < word.length; i++) {
                    if (wordGrid[row + i][col] !== '') {
                        canPlace = false;
                        break;
                    }
                }
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        // Place word
                        wordGrid[row + i][col] = { letter: word[i], isCorrect: true, isClicked: false, word};
                    }
                    wordPlaced = true;
                }
            }
        }
    }, [wordGrid]);

   // Initialize the word search grid and select random words
   useEffect(() => {
        // 2D array with 10 rows and 15 columns, initialized with empty strings representing each cell of the word search grid
        const grid = Array.from({ length: 10 }, () => Array.from({ length: 15 }, () => ''));
        setWordGrid(grid);

        const categoryWords = selectedCategory === 'Food' ? foodWords : selectedCategory === 'Sports' ? sportsWords : selectedCategory === 'Computing' ? computingWords : normalWords;

        // Select 10 random words
        const randomWords = [];
        const shuffledWords = categoryWords.sort(() => 0.5 - Math.random());
        for (let i = 0; i < 10; i++) {
            randomWords.push(shuffledWords[i].toUpperCase());
        }
        setWords(randomWords);
    }, [selectedCategory]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    if (selectedTheme === "Blitz") {
                        setGameOver(true);
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [selectedTheme]);
    
    // navigate to the end page when the if the timer runs out or if all the words are found
    useEffect(() => {
        if (gameOver || foundWords.length === 10) {
            navigate("/wordsearch-gameover", { state: { finishedTime: timeRemaining, theme: selectedTheme, numFoundWords: foundWords.length } });
        }
    }, [gameOver, foundWords, timeRemaining, selectedTheme, navigate]);

    // Place words in grid and fill empty spaces with random letters
    useEffect(() => {
        words.forEach(word => {
            placeWordInGrid(word);
        });

        // Fill blank spaces with random letters
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < wordGrid.length; i++) {
            for (let j = 0; j < wordGrid[i].length; j++) {
                if (wordGrid[i][j] === '') {
                    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                    wordGrid[i][j] = { letter: randomLetter, isCorrect: false };
                }
            }
        }
    }, [words, placeWordInGrid, wordGrid]);

    // Function to handle key press event for revealing words
    const handleKeyPress = (event) => {
        if (event.key === 'r') {
            setReveal(prevState => !prevState); // Toggle reveal state
        }
    };

    // Function to handle click event on a cell
    const handleClick = (rowIndex, colIndex) => {
        const cell = wordGrid[rowIndex][colIndex];
        if (cell.isCorrect) {
            cell.isClicked = true;
            setClickedCells(prevClickedCells => [...prevClickedCells, { rowIndex, colIndex }]);
            checkFoundWords(); // see if word is found after click
        }
    };

    // Function to check if words are found
    const checkFoundWords = () => {
        const wordsFound = [];

        // Loop through the grid for each word and check if it's clicked
        words.forEach(word => {
            let allClicked = true;

            // Continue checking other cells associated with the word if the current cell is clicked,
            // otherwise break and do the check for the next word
            for (let i = 0; i < wordGrid.length; i++) {
                for (let j = 0; j < wordGrid[i].length; j++) {
                    const cell = wordGrid[i][j];
                    if (cell.word === word && cell.isCorrect && !cell.isClicked) {
                        allClicked = false; // If any cell for the word is not clicked, set allClicked to false
                        break;
                    }
                }
                if (!allClicked) break;
            }

            // Store the 'found' state of the current word (true if all cells clicked, false otherwise)
            if (allClicked) {
                wordsFound.push(word);
            }
        });

        setFoundWords(wordsFound);
    };

    // Attach key press event listener when component mounts
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <Container className="main_container justify-content-center">
            <Row className="justify-content-around" style={{ padding: '20px' }}>
                <Col xs='auto' className="d-flex flex-column justify-content-start align-items-start" style={{ width: '25%' }}>
                    <Button type="button" className="btnclass restart">
                        <Link to="/wordsearch-selection" className="linkclass">Back</Link>
                    </Button>
                </Col>
                <Col className='align-items-start' style={{ width: '50%' }}>
                    <h2 className="text-dark"> Word Search - {selectedCategory} {selectedTheme} </h2>
                </Col>
                <Col xs='auto' className='align-self-center d-flex justify-content-end' style={{ width: '25%'}}>
                    {selectedTheme !== "Normal" && (
                        <Counter count={timeRemaining} type='Time'/>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={4} className="d-flex flex-column justify-content-center align-items-end" style={{ width: '20%' }}>
                    <p></p>
                </Col>
                <Col xs={6} className="d-flex justify-content-center" style={{ width: '60%' }}>
                    <div className='word-search-grid'>
                        {wordGrid.map((row, rowIndex) => (
                            <div key={rowIndex} className='word-search-row'>
                                {row.map((cell, colIndex) => (
                                    /* 
                                    Render each cell of the word search grid with a specific color based on reveal state, correctness, and clicked status:
                                    - If reveal is true and the cell contains a correct letter, render it in red.
                                    - If the cell is clicked and contains a correct letter, render it in red.
                                    - Otherwise, render it in black.
                                    */
                                    <button
                                    key={colIndex}
                                    className={`word-search-cell ${cell.isCorrect && clickedCells.some(({ rowIndex: clickedRowIndex, colIndex: clickedColIndex }) => clickedRowIndex === rowIndex && clickedColIndex === colIndex) ? 'correct-clicked' : ''}`}
                                    style={{ color: reveal && cell.isCorrect ? 'red' : 'black' }}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                >
                                    {cell.letter}
                                </button>

                                                                
                                ))}
                            </div>
                        ))}
                    </div>
                </Col>
                <Col xs={4} className="d-flex flex-column justify-content-center align-items-end" style={{ width: '20%' }}>
                    <p></p>
                </Col>
            </Row>
            <Row style={{ padding: '20px' }}>
                <Col className="justify-content-center">
                    <div className="words-container">
                        <h5>Words To Find</h5>
                    </div>
                    <div className='words-grid-container'>
                        {words.map((word, idx) => (
                        <p
                            key={idx}
                            className={`words-grid-item ${foundWords.includes(word) ? 'word-clicked' : ''}`}
                            style={{
                                color: foundWords.includes(word) ? '#024372' : 'black',
                                textDecoration: foundWords.includes(word) ? 'line-through' : 'none'
                            }}
                        >
                            {word}
                        </p>
                        
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default WordSearch;
