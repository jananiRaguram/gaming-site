import React from 'react';
import '../../styles/about_me.css';
import pythonimg from "../../images/python.png";
import HTMLimg from "../../images/HTML.png";
import CSSimg from "../../images/CSS.png";
import reactimg from "../../images/react.png";
import seleniumimg from "../../images/selenium.png";
import nodeimg from "../../images/Node.png";
import jsimg from "../../images/javascript.png";
import mailimg from "../../images/mail.png";


const nitin = () => {

  const handlePythonImageClick = () => {
    window.location.href = '/cipher';
  };
  
    return (
        <>
        <title>About Nitin</title>
        <body>
            <header>
            </header>
            <div class="center">
                <h1>Nitin Sharma</h1>  
            </div>
            <div class="info-panel">
                <h2 class ="nametitle intro-para">Hello my Name is Nitin! Nice to meet you! 👋</h2>
                
                <p>I'm a software engineer in my final year at the university of Guelph. My favourite aspect of software engineering is
                    front end development. I find this process very fun as it involves a lot of design. My favourite sport is soccer and in my free 
                    time I like to play video games.   
                </p>
                
                <p>Here's some of my skills:</p>

                <ul>
                    <li><strong>Languages:</strong> Python, Java, JavaScript, HTML, CSS</li>
                    <li><strong>Frameworks:</strong> React, Node JS, Selenium</li>
                    <li><strong>Additional tools:</strong> Git, VS Code</li>
                </ul>
                <div class="socials center">
                    <img src={pythonimg} alt="" onClick={handlePythonImageClick} />
                    <img src={jsimg} alt=""/>
                    <img src={reactimg} alt=""/>
                    <img src={nodeimg} alt=""/>
                    <img src={seleniumimg} alt=""/>
                    <img src={HTMLimg} alt=""/>
                    <img src={CSSimg} alt=""/>
                </div>
                <div class="socials">
                  <a href="mailto:nitin@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
                </div>
            </div>
        </body>
        </>
    );
  };
  export default nitin;