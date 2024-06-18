import React from 'react';
import '../../styles/about_me.css';
import linkedinimg from "../../images/lnkdin.png";
import gitlabimg from "../../images/gitlab.png";
import mailimg from "../../images/mail.png";
import { HiddenEasterEgg } from "react-hidden-easter-egg";
import { toast } from 'react-toastify';
import { ConfettiCanvas } from "react-raining-confetti";

const mohammad = () => {
    return (
        <>
        <title>About Mohammad</title>
        <body>
            <header>
                <h1>Mohammad Kanth</h1>
            </header>

            <div class="info-panel">
                <h2 class="intro-para">Hello, I'm Mohammad</h2>
                
                <p>Welcome to my about me section! I'm a software engineer who loves to solve problems in new and creative ways. My journey in the world of programming started when I started university, and since then, I've been growing my skills as a dveloper and trying to constantly improve myself.</p>
                
                <p>Here's some of my skills:</p>

                <ul>
                    <li><strong>Languages:</strong> Python, Java, Golang, HTML, CSS</li>
                    <li><strong>Frameworks:</strong> React, Express, Bootstrap</li>
                    <li><strong>Additional tools:</strong> Git, VS Code</li>
                </ul>

                <p>When I'm not engineering, you can find me playing sports or at the gym.</p>
                <div class="socials">
                    <a href="https://www.linkedin.com/in/mkanth" target="_blank" rel="noopener noreferrer"><img src={linkedinimg} alt=""/></a>
                    <a href="https://gitlab.socs.uoguelph.ca/mkanth" rel="noopener noreferrer" target="_blank"><img src={gitlabimg} alt=""/></a>
                    <a href="mailto:mkanth@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
                </div>
            </div>
        </body>
        <br/>
        <br/>
        <br/>
        <text>type           h    o    o    p</text>
        <HiddenEasterEgg code={['h', 'o', 'o', 'p']} resetEggMs={1000} cb={() =>  toast("This is not a clue HAHAHAHA")}>
            <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={5000} />
        </HiddenEasterEgg>
        </>
    );
  };
  export default mohammad;