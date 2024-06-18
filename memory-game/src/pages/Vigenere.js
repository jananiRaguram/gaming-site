import React, { useState } from 'react';
import '../styles/cipher.css';
import '../styles/Vigenere.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import cipherImage from '../images/laby.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Vigenere = () => {

    const [answer, setAnswer] = useState('');
    const cipher = "Trapped your heart pounded. Panic gnawed at you, but then, a twitch - a rabbit emerged from the hedge, darting left. You followed the rabbit leading you to a narrow passage. Emerging into sunlight, the labyrinth conquered, not by strength, but by a story, a rabbit, and a touch of bravery."
    // navigate function to move to game page
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = () => {
        const trimmedEntry = answer.trim(); // Remove leading and trailing spaces

        if (trimmedEntry.toLowerCase() === cipher.toLowerCase()) {
            redirectSolved()
        } else {
            toast('Incorrect, try again!');
            // window.location.reload(false);
        }
    };

    const handleHint = () => {
        toast("I'm a symbol of luck, with feet of four,")
        toast("In folklore tales, I'm often adored.")
        toast("With a bound and a bounce, I roam free,")
        toast("Guess my name, in the wild, you'll see!")                  
    };


    // Function to handle input change
    const handleInputChange = event => {
        setAnswer(event.target.value);
    };


    // redirect to endscreen
    const redirectSolved = () => {
        navigate("/solvedendvigenere");
    };


    // if user presses enter key
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // prevent page from reloading when correct answer is given
            event.preventDefault();
            setAnswer(event.target.value);
            handleSubmit();
        }
    };


    return (
        <Container className='pt-4'>
            <Card className='bg-dark text-white'>
                <Card.Img src={cipherImage} alt='Card image' className='bgImg2' />
                <Card.ImgOverlay>
                    <button 
                        type="button"  
                        id="hintbutton" 
                        class="btn btn-primary" 
                        onClick = {handleHint}
                    >
                        Hint
                    </button>
                    <h1 className="card-title">Escape the Labyrinth</h1>
                    <Card.Text className='pt-4 d-inline-block'>
                        {/* Display the encoded phrase */}
                        <p className='encoded-phrase2'>Krbqxxu ypvz avasu xhlnefl. Irnjd ogrwfe im pov, ccm khfo, i mniudp - t iaccqm vmfsoxu fspu mye iflzv, dbsbbeg mfnm. Pov gwecoxfl mye sbjuzt mfiwznh zwn ko b oikiox qiljahf. Mfvrhjvz znup aneljhpm, khf miuprjoba toorcxiee, owm sy tuzxegui, jnk bz b amfrz, b ztsbju, igu a upcvy og cztmesz.</p>
                        <form className='decode-containter'>
                            <div class="form-group">
                                <label for="enteredText2" className='answer-label'>Decrypt the message above and escape labyrinth:</label>
                                <textarea type="textarea" class="form-control" id="enteredText2" aria-describedby="answer" rows="3" cols="100" value={answer} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                            </div>
                            <div class="btn-container">
                                <button type="button" id="slovebutton" class="btn btn-primary" onClick={handleSubmit}>Solve</button>
                            </div>
                        </form>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </Container>
    );
};

export default Vigenere;
