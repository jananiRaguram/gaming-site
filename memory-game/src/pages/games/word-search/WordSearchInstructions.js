import React from 'react';
import '../../../styles/instructions.css';
import Carousel from 'react-bootstrap/Carousel';
import stepws1 from "../../../images/word-search/ws1.png";
import stepws2 from "../../../images/word-search/ws2.png";
import stepws3 from "../../../images/word-search/ws3.png";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const WordSearchInstructions = () => {
  return (
    <>
        <body class="big-panel22">
            <div class="big-panel32">
                <h1 class="blacktext">Word Search Instructions</h1>
                <div>
                    <Carousel data-bs-theme="dark" >
                        <Carousel.Item >
                            <img src={stepws1} alt="" className='instruction-img'/> 
                            <Carousel.Caption>
                                <h3 className='caption'>Find as many words as you can before the timer runs out!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stepws2} alt="" className='instruction-img'/>
                             <Carousel.Caption>
                                <h3 className='caption'>Click on each letter to form a word</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={stepws3} alt="" className='instruction-img'/>
                            <Carousel.Caption>
                                <h3 className='caption'>Words can show up in any orientation so keep an eye out!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="button-container col-6 mx-auto">
                    <Button className="btnclass"><Link to="/wordsearch-start" className="linkclass">Back</Link></Button>
                    <Button className="btnclass"><Link to="/wordsearch-selection" className="linkclass">Start</Link></Button>
                </div>           
            </div>
        </body>
    </>
  );
};


export default WordSearchInstructions;

