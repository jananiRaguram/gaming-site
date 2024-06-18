import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import '../styles/SolvedEnd.css';
import $ from 'jquery';

const SolvedEnd = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('Stranger');
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 40000); // Redirect after 40 seconds
        
         // get username from database using token
        const getUser = async () => {
            const token = localStorage.getItem('token');
            let userData = { user: { username: 'Stranger' } };
            const apiUrl = process.env.REACT_APP_API_URL || 'https://cis4250w24-10.socs.uoguelph.ca/api';
            if (token) {
                userData = await $.ajax({
                    type: 'GET',
                    url: `${apiUrl}/user_info`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            setName(userData.user.username);
        };
        getUser();
        return () => clearTimeout(timeout); // Clearing the timer for next use
    });

   
    //used for styling callback
    const cursor = 'type'; 

    return (
        // https://react-type-animation.netlify.app/options

        //refresh/hard refresh page after any changes
        <div className='message-container'>
            <h5 className='name-message'>A message for {name}:</h5>
            <TypeAnimation
                sequence={[
                    (el) => el.classList.add(cursor),
                    'So you solved our puzzle...',
                    1500, //delay before typing again
                    'CONGRATULATIONS!!',
                    1000,
                    'But beware,',
                    1500,
                    'But beware, you might not see this page again', //continues
                    1800,
                    'Don\'t get too comfortable',
                    1500,
                    'Don\'t get too comfortable, or you might miss a clue in plain sight', //continues
                    1800,
                    'Riddles, buttons, card games',
                    1500,
                    'Riddles, buttons, card games, they can be more than they seem...',
                    1800,
                    'So don\'t trust us with what you see...',
                    1500,
                    'The journey\'s just begun, my friend,',
                    1500,
                    'Where twists and turns may never end.',
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
    );
};

export default SolvedEnd;
