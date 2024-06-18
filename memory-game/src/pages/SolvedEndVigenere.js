import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import '../styles/SolvedEnd.css';
import '../styles/SolvedEndVigenere.css';
import step1 from "../images/rabbit_1_bg.png";
import step2 from "../images/rabbit_2_bg.png";
import step3 from "../images/rabbit_3_bg.png";
import step4 from "../images/rabbit_4_bg.png";
import step5 from "../images/rabbit_5_bg.png";
import step6 from "../images/rabbit_6_bg.png";
import Carousel from 'react-bootstrap/Carousel';


const SolvedEnd = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // eslint-disable-next-line
        const timeout = setTimeout(() => {
            navigate('/');
        }, 46000); // Redirect after 40 seconds
    });
   
    //used for styling callback
    const cursor = 'type';

    return (
        <div>
            <div>
            {/* images of rabbit going away */}
                <div>
                    <Carousel fade={true} indicators={false} controls={false} interval={500} keyboard={false} touch={false} wrap={false} pause={false} data-bs-theme="dark" >
                        <Carousel.Item >
                            <img src={step1} className='rabbitimage' alt=""/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step2} className='rabbitimage' alt=""/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step3} className='rabbitimage' alt=""/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step4} className='rabbitimage' alt=""/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={step5} className='rabbitimage' alt=""/>
                        </Carousel.Item>    
                        <Carousel.Item>
                            <img src={step6} className='rabbitimage' alt=""/>
                        </Carousel.Item>                
                    </Carousel>
                </div>
            </div>
       {/* animated message for user */}
            <div className='message-container2'>
                <TypeAnimation
                    sequence={[
                        (el) => el.classList.add(cursor),
                        6000,
                        'Congratulations, weary traveler',
                        1500, //delay before typing again
                        "for escaping the labyrinth's grasp",
                        1000,
                        'But remember, every exit',
                        1500,
                        'is an entrance to something new.',
                        1500,  
                        "You've followed the white rabbit and found your way out",
                        1000,
                        'But beware, the path ahead may be just as treacherous.',
                        1500,
                        'Fear not the unknown for it is the realm of endless possibilities',
                        1500,
                        'Embrace the journey,',
                        1000,
                        'for it is not the destination that defines us',
                        1500,
                        'but the paths we choose to walk along the way.',
                        (el) => el.classList.remove(cursor),
                    ]}
                    wrapper="span"
                    speed={45}
                    cursor={false}
                    style={{ fontSize: '2em', display: 'inline-block', color:'#31b231' }}
                    repeat={0}
                    omitDeletionAnimation={true}
                    className='type-theme'
                />
            </div>
        </div>
    );
};

export default SolvedEnd;
