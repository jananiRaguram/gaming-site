import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/cardselect.css';
import '../../../styles/wordsearch.css';
import { Container } from "react-bootstrap";

function BuzzWordsSelection() {
    const navigate = useNavigate();
    const [selectedDifficulty, setSelectedDifficulty] = useState('Normal'); 

    //Navigate to the game and pass number of cards and theme chosen 
    const handleSubmit = () => {
        navigate("/buzzwords", { state: { difficulty: selectedDifficulty} });
    };

    return (
        <Container className="big-panel buzz-img" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
            <div className="main-content" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
                <h4>Select Difficulty:</h4>
                <p></p>
                <div className="radio-container">
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Normal"
                            checked={selectedDifficulty === 'Normal'}
                            onChange={() => setSelectedDifficulty('Normal')}
                        />
                        <span className="radio-btn"></span>
                        Normal
                    </label>
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Blitz"
                            checked={selectedDifficulty === 'Hard'}
                            onChange={() => setSelectedDifficulty('Hard')}
                        />
                        <span className="radio-btn"></span>
                        Hard
                    </label>
                </div>
                <p></p>
                <p></p>
                <div className="button-container pt-4">
                    <button className="btnclass" onClick={handleSubmit}>Start Game</button>
                </div>
            </div>
        </Container>
      );
};

export default BuzzWordsSelection;
