import React from 'react';
import '../../styles/about_me.css';
import jananiimg from "../../images/janani.jpg";
import mailimg from "../../images/mail.png";
import { HiddenEasterEgg } from "react-hidden-easter-egg";
import { toast } from 'react-toastify';
import { ConfettiCanvas } from "react-raining-confetti";


const janani = () => {
    return (
        <>
            <title>About Janani</title>
            <body>
                <header>
                    <h1>Janani Raguram</h1>
                </header>

                <div class="info-panel">
                    <div>
                        <h2 class="intro-para">Hey! I'm Janani
                            <img src={jananiimg} alt="Janani Raguram" class="portrait-icon"/>
                        </h2>
                        
                    </div>

                    <p>I'm currently in my final year of software engineering, I also did a minor in psychology. As a developer I like to do front end work along with designing.</p>
                    
                    <p>Here's some of my dev skills:</p>

                    <ul>
                        <li><strong>Languages:</strong> C, Java, JavaScript/TypeScript, HTML, CSS</li>
                        <li><strong>Frameworks:</strong> React, Angular</li>
                        <li><strong>Additonal Skills:</strong> Git, Bootstrap</li>

                    </ul>
                    <p>For fun and to keep my mind off work, I like to play cities skylines, do some photography, play badminton, and continuously scroll on tiktok.</p>
                    <div class="socials">
                      <a href="mailto:jraguram@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
                    </div>
                </div>
            </body>
            <br/>
            <br/>
            <br/>
            <text>type           b     a    l     l</text>
            <HiddenEasterEgg code={['b', 'a', 'l', 'l']} resetEggMs={1000} cb={() =>  toast("Not here either")}>
                <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={5000} />
            </HiddenEasterEgg>
        </>
    );
  };
  export default janani;