import React from 'react';
import '../../../styles/instructions.css';
import Carousel from 'react-bootstrap/Carousel';
import step1 from "../../../images/buzzwords/buzz-start.png";
import step2 from "../../../images/buzzwords/spelt-word.png";
import step3 from "../../../images/buzzwords/spelt-word-2.png";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const instructions = () => {
  return (
    <>
        <body class="big-panel22" >
            <div class="big-panel32">
                <h1 class="blacktext">Buzz Words Instructions</h1>
                <div>
                    <Carousel data-bs-theme="dark" >
                        <Carousel.Item >
                            <img src={step1} alt="" className='instruction-img buzz-instruction-img'/>
                            <Carousel.Caption>
                                <h3 className='caption'>Spell out the most words with the letters you see before the timer runs out!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step2} alt="" className='instruction-img buzz-instruction-img'/>
                            <Carousel.Caption>
                                <h3 className='caption'>We only count common English words, but they can be of any length.</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step3} alt="" className='instruction-img buzz-instruction-img'/>
                            <Carousel.Caption>
                                <h3 className='caption'>The more words you find the closer you’ll get to becoming ‘Queen Bee’</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="button-container col-6 mx-auto">
                    <Button className="btnclass"><Link to="/buzzwords-start" className="linkclass">Back</Link></Button>
                    <Button className="btnclass"><Link to="/buzzwords" className="linkclass">Start</Link></Button>
                </div>           
            </div>
        </body>
    </>
  );
};


export default instructions;

