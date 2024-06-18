import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/cardselect.css';
import '../../../styles/wordsearch.css';
import { Container } from "react-bootstrap";

function WordSearchSelection() {
    const navigate = useNavigate();
    const [selectedTheme, setSelectedTheme] = useState('Normal'); 
    const [selectedCategory, setSelectedCategory] = useState('Random'); 

    //Navigate to the game and pass number of cards and theme chosen 
    const handleSubmit = () => {
        navigate("/wordsearch", { state: { theme: selectedTheme, category: selectedCategory} });
    };

    return (
        <Container className="big-panel wordgame-img" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
            <div className="main-content" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
                <h4>Select Theme:</h4>
                <p></p>
                <div className="radio-container">
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Normal"
                            checked={selectedTheme === 'Normal'}
                            onChange={() => setSelectedTheme('Normal')}
                        />
                        <span className="radio-btn"></span>
                        Normal
                    </label>
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Blitz"
                            checked={selectedTheme === 'Blitz'}
                            onChange={() => setSelectedTheme('Blitz')}
                        />
                        <span className="radio-btn"></span>
                        Blitz
                    </label>
                </div>
                <p></p>
                <h4 className="pt-4">Select Category:</h4>
                <div className="radio-container">
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Random"
                            checked={selectedCategory === 'Random'}
                            onChange={() => setSelectedCategory('Random')}
                        />
                        <span className="radio-btn"></span>
                        Random
                    </label>
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Sports"
                            checked={selectedCategory === 'Sports'}
                            onChange={() => setSelectedCategory('Sports')}
                        />
                        <span className="radio-btn"></span>
                        Sports
                    </label>
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Food"
                            checked={selectedCategory === 'Food'}
                            onChange={() => setSelectedCategory('Food')}
                        />
                        <span className="radio-btn"></span>
                        Food
                    </label>
                    <label className="custom-radio-button">
                        <input
                            type="radio"
                            value="Computing"
                            checked={selectedCategory === 'Computing'}
                            onChange={() => setSelectedCategory('Computing')}
                        />
                        <span className="radio-btn"></span>
                        Computing
                    </label>
                </div>
                <p></p>
                <div className="button-container pt-4">
                    <button className="btnclass" onClick={handleSubmit}>Start Game</button>
                </div>
            </div>
        </Container>
      );
};

export default WordSearchSelection;
