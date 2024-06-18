import React from 'react';
import '../../../styles/buzz.css';
import { Button } from 'react-bootstrap';

// buzzword button, takes in letter, the addletter function, and reset disable value
const BuzzWordButton = ({ letter, addLetterToWord, classType }) => {

    // function for handling a click for a button
    const handleClick = () => {
        // when button is clicked update the function so that letter can be added to the function
        addLetterToWord(letter)
        // set the button to not when button is clicked
    };

    return (
        <div className="hh" breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xs">
            <Button className={classType +" given-letters"} onClick={handleClick}>{letter}</Button>
        </div>
    );
};

export default BuzzWordButton;
