import React from 'react';
import '../../styles/about_me.css';
import mailimg from "../../images/mail.png";
import Draggable from "react-draggable";
import { toast } from 'react-toastify';


const amardeep = () => {

  const checkStop = (e, data) => {
    console.log(data)
    if ((data.x <= 450 && data.x >= 400) && (data.y <= 350 && data.y >= 300 )){
      toast("Next Clue: Find the Snake");
    }
  };

  return (
    <>
    <title>About Amardeep</title>
    <body>
        <header>
            <h1>Amardeep Singh</h1>
        </header>

        <div className="info-panel">
            <h2 className="intro-para">Hello, I am Amardeep</h2>
           
            <div >
              <p className="textpanelbasketball">Hello and welcome to my about me section! Currently, I'm in the final year of my Software Engineering program at the University of Guelph with a minor in Business. Outside of coding, you can often find me shooting hoops</p>
              <Draggable onStop={checkStop}>
                <p className="textpanelbasketball">🏀</p>
              </Draggable>
              <p >or going for a drive 🏎️.</p>
            </div>
            <p>Here's some of my skills:</p>

            <ul>
                <li><strong>Languages:</strong> Python, C++, Java, Ruby, JavaScript/TypeScript, HTML/CSS</li>
                <li><strong>Frameworks:</strong> React, Flask, Node.js, Docker, AWS, Selenium, GraphQL</li>
                <li><strong>Additional tools:</strong> Git, Jupyter, Jira, Confluence</li>
            </ul>
            <div class="socials">
                    <a href="mailto:asingh80@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
            </div>
        </div>
        <p className="net" >🗑️</p>
    </body>
    </>
  );
};
export default amardeep;
