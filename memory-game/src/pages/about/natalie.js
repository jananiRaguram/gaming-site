import React from 'react';
import '../../styles/about_me.css';
import natalieimg from "../../images/natalie.png";
import mailimg from "../../images/mail.png";

const natalie = () => {
    return (
        <>
        <title>About Natalie</title>
        <body>
            <header>
                <h1>Natalie Ykema</h1>
            </header>
            <div class="info-panel">
                <h2 class="intro-para">Hi, I'm Natalie</h2>
                <p>Welcome to my about me section! I'm currently in my final year of Software Engineering and minoring in Business. I enjoy front-end development. </p>
                <p>Here's some of my skills:</p>
                <ul>
                    <li><strong>Languages:</strong> Python, Java, Javascript/Typescript, HTML, CSS</li>
                    <li><strong>Frameworks:</strong> React, Bootstrap</li>
                    <li><strong>Additional Tools:</strong> Git, VS Code</li>
                </ul>
                <p>In my free time I am fond of reading, being active and spending time with my family and friends.</p> 
                <img src={natalieimg} alt="Natalie Ykema" class="portrait"/>
              <div class="socials">
                <a href="mailto:nykema@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
              </div>
            </div>
        </body>
        </>
    );
  };
  export default natalie;