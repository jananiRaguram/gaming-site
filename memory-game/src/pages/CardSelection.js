import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/match.css';
import '../styles/cardselect.css';

function CardSelectionScreen() {
    const navigate = useNavigate();
    const [selectedCards, setSelectedCards] = useState(8);
    const [selectedTheme, setSelectedTheme] = useState('Animals'); 

    //Navigate to the game and pass number of cards and theme chosen 
    const handleSubmit = () => {
        navigate("/game", { state: { numCards: selectedCards, theme: selectedTheme } });
    };

    return (
        <div className="big-panel container">
        <div className="main-content">
            <h4>Select Number of Cards:</h4>
            <p></p>
            <div className="radio-container">
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value={8}
                        checked={selectedCards === 8}
                        onChange={() => setSelectedCards(8)}
                    />
                    <span className="radio-btn"></span>
                    8 Cards
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value={12}
                        checked={selectedCards === 12}
                        onChange={() => setSelectedCards(12)}
                    />
                    <span className="radio-btn"></span>
                    12 Cards
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value={16}
                        checked={selectedCards === 16}
                        onChange={() => setSelectedCards(16)}
                    />
                    <span className="radio-btn"></span>
                    16 Cards
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value={20}
                        checked={selectedCards === 20}
                        onChange={() => setSelectedCards(20)}
                    />
                    <span className="radio-btn"></span>
                    20 Cards
                </label>
            </div>
            <p></p>
            <h4>Select Theme:</h4>
            <div className="radio-container">
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value="Animals"
                        checked={selectedTheme === 'Animals'}
                        onChange={() => setSelectedTheme('Animals')}
                    />
                    <span className="radio-btn"></span>
                    Animals
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value="Landscapes"
                        checked={selectedTheme === 'Landscapes'}
                        onChange={() => setSelectedTheme('Landscapes')}
                    />
                    <span className="radio-btn"></span>
                    Landscapes
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value="Logos"
                        checked={selectedTheme === 'Logos'}
                        onChange={() => setSelectedTheme('Logos')}
                    />
                    <span className="radio-btn"></span>
                    Logos
                </label>
                <label className="custom-radio-button">
                    <input
                        type="radio"
                        value="Halloween"
                        checked={selectedTheme === 'Halloween'}
                        onChange={() => setSelectedTheme('Halloween')}
                    />
                    <span className="radio-btn"></span>
                    Halloween
                </label>
        
            </div>
            <p></p>
            <div className="button-container">
                <button className="btnclass primary" onClick={handleSubmit}>Start Game</button>
            </div>
        </div>
        </div>
      );
};

export default CardSelectionScreen;
