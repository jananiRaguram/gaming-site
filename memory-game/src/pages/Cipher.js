import React, { useState, useEffect } from 'react';
import '../styles/cipher.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import cipherImage from '../images/cipher.jpg';
import phrasesData from '../assets/phrases.json'; 

const Cipher = () => {
    const [phrases, setPhrases] = useState([]);
    const [selectedPhrase, setSelectedPhrase] = useState('');
    const [encodedPhrase, setEncodedPhrase] = useState('');
    const [enteredText, setEnteredText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [generateNewPhrase, setGenerateNewPhrase] = useState(true); // Flag to indicate if new phrase needs to be generated
    const [hint, setHint] = useState('');
    const [randomShift, setRandomShift] = useState(0);

    // Fetch phrases from JSON file
    // change to fetch request from back end 
    useEffect(() => {
        setPhrases(phrasesData.phrases);
    }, []);

    // select a random phrase and encode it
    useEffect(() => {
        if (phrases.length > 0 && generateNewPhrase) {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            const selected = phrases[randomIndex];
            setSelectedPhrase(selected);

            // random shift from 1 to 25
            const randomShiftValue = Math.floor(Math.random() * 25) + 1;
            setRandomShift(randomShiftValue);

            // Encode using Caesar cipher
            setEncodedPhrase(encodeCipher(selected, randomShiftValue)); 

            // console.log(`phrase: ${selected}`);
            // console.log(`shift: ${randomShiftValue}`);
        
            setGenerateNewPhrase(false);
        }
    }, [phrases, generateNewPhrase]);

    // Caesar cipher encoding function
    const encodeCipher = (text, shift) => {
        return text.replace(/[a-zA-Z]/g, (char) => {
            const charCode = char.charCodeAt(0);
            let shiftedCharCode = charCode + shift;

            // Uppercase
            if (charCode >= 65 && charCode <= 90) { 
                if (shiftedCharCode > 90) {
                    shiftedCharCode -= 26;
                }
            } else if (charCode >= 97 && charCode <= 122) { // lowercase
                if (shiftedCharCode > 122) {
                    shiftedCharCode -= 26;
                }
            }

            return String.fromCharCode(shiftedCharCode);
        });
    };

    // Function to handle input change
    const handleInputChange = event => {
        setEnteredText(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = () => {
        const trimmedEntry = enteredText.trim(); // Remove leading and trailing spaces

        if (trimmedEntry.toLowerCase() === selectedPhrase.toLowerCase()) {
            const token = localStorage.getItem('token');
            if (token) {
                setFeedback(`/${token}`);
            }
            else {
                setFeedback('Hmm, you need to login to continue. Sorry! ');
            }
        } else {
            setFeedback('Incorrect, try again!');
            window.location.reload(false);
        }
    };

    // Function to generate and display hint
    const handleHint = () => {
        const randomOffset = Math.floor(Math.random() * 7) - 3;  // Generating a random number within -3 to 3

        const hintShift = randomShift + randomOffset; // Adding random offset to the shift value
        setHint(`The shift used in the cipher is around ${hintShift}`);
    };

    // if user presses enter key
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // prevent page from reloading when correct answer is given
            event.preventDefault();
            setEnteredText(event.target.value);
            handleSubmit();
        }
      };

    return (
        <Container className='pt-4'>
            <Card className='bg-dark text-white'>
                <Card.Img src={cipherImage} alt='Card image' className='bgImg' />
                <Card.ImgOverlay>
                    <h1 className="card-title">Decode The Secret To Continue</h1>
                    <Card.Text className='pt-4 d-inline-block'>
                        {/* Display the encoded phrase */}
                        <p className='encoded-phrase'>{encodedPhrase}</p>
                        {hint && <p>{hint}</p>}
                        <form className='decode-containter'>
                            <div class="form-group">
                                <label for="enteredText" className='answer-label'>Enter your answer below:</label>
                                <input type="text" class="form-control" id="enteredText" aria-describedby="answer" value={enteredText} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                            </div>
                            <div class="btn-container">
                                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                <button type="button" class="btn btn-primary" onClick={handleHint}>Hint</button>
                            </div>
                        </form>
                        {feedback && <p>{feedback}</p>}
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </Container>
    );
};

export default Cipher;
