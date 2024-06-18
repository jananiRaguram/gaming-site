import React from 'react';
import '../styles/instructions.css';
import Carousel from 'react-bootstrap/Carousel';
import step1 from "../images/matchup-1.svg";
import step2 from "../images/matchup-2.svg";
// import step3 from "../images/Frame_5.png";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const instructions = () => {
  return (
    <>
        <body class="big-panel22">
            <div class="big-panel32">
                <h1 class="blacktext">Match Up Instructions</h1>
                <div>
                    <Carousel data-bs-theme="dark" >
                        <Carousel.Item >
                            <img src={step1} alt="" className='instruction-img'/>
                            <Carousel.Caption >
                                <h3 className='caption'>Click on 2 tiles to flip them over to see if they are a match</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step2} alt="" className='instruction-img'/>
                            <Carousel.Caption >
                                <h3 className='caption'>Matching cards will stay flipped but wrong matchs will flip back so be sure to remember!</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        {/* <Carousel.Item>
                            <img src={step3} alt="" className='instruction-img'/>
                        </Carousel.Item> */}
                    </Carousel>
                </div>
                <div className="button-container col-6 mx-auto">
                    <Button className="btnclass"><Link to="/matchgame" className="linkclass">Back</Link></Button>
                    <Button className="btnclass"><Link to="/cardSelection" className="linkclass">Start</Link></Button>
                </div>           
            </div>
        </body>
    </>
  );
};


export default instructions;

