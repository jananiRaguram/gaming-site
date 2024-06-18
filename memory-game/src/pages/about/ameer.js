import React, {useEffect, useState} from 'react';
import '../../styles/about_me.css';
import linkedinimg from "../../images/lnkdin.png";
import gitlabimg from "../../images/gitlab.png";
import ameerimg from "../../images/ameer.png";
import portfolioimg from "../../images/portfolio.png";
import mailimg from "../../images/mail.png";


const Ameer = () => {
    const [transparency, setTransparency] = useState(1);

    useEffect(() => {
      const handleScroll = () => {
        setTransparency(prevTransparency => prevTransparency - 0.005);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); 
    return (
        <>
        <title>About Ameer</title>
        <body>
            <header>
                <h1>Ameer Mushani</h1>
            </header>

            <div class="info-panel">
                <h2 class="intro-para">
                    Hey! <span style={{ opacity: transparency }}>I'm </span>A<span style={{ opacity: transparency }}>meer</span>
                </h2>

                <p>I'm currently completing my final year of Software Engineering at the University of Guelph. I love backend and cloud development and playing fighting games! 😎</p>
                
                <p>Here's some of my skills:</p>

                <ul>
                    <li><strong>Languages:</strong> Python, Java, C, Javascript/Typescript, SQL</li>
                    <li><strong>Additional tools:</strong> Git, Linux, Kuberenetes, AWS</li>
                </ul>

                <p>Check out my LinkedIn, Github, and Personal Site below!</p>
                

                <div class="socials">
                    <a href="https://www.linkedin.com/in/ameer-mushani/" target="_blank" rel="noopener noreferrer"><img src={linkedinimg} alt=""/></a> 
                    <a href="https://github.com/Ameer-Mushani" target="_blank" rel="noopener noreferrer"><img src={gitlabimg} alt=""/></a>
                    <a href="https://ameer.netlify.app/" target="_blank" rel="noopener noreferrer"><img src={portfolioimg} alt=""/></a>
                    <a href="mailto:amushani@uoguelph.ca" rel="noopener noreferrer" target="_blank"><img src={mailimg} alt=""/></a>
                </div>
                <img src={ameerimg} alt="Ameer Mushani" class="portrait"/>
            </div>
        </body>
        <p>Keep scrolling nothing to see here...</p>
        </>
    );
  };
  export default Ameer;