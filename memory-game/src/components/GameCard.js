import '../styles/general.css';
import Card from 'react-bootstrap/Card';

const GameCard = ({ title, desc, buttonText, image, redirect, setcolor}) => {
    // hoverBg is for when the card component is hovered
    const hoverBg = {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${image})`,  backgroundRepeat  : 'no-repeat', backgroundPosition: 'center',backgroundSize: 'cover',transition:'background 1000ms', }
    // when card component is not being hovered
    const regBg = {background: '#333333'}

    // 
    return (
        // on mouse enter change background to image
        // on mouse leave revert to regular background
        // card component is filled dynamically
        <Card  onMouseEnter={ () => {setcolor(hoverBg)} } onMouseLeave={ () => setcolor(regBg)} className='cardbackground' style={{ width: '20rem', height:'450px' }}>
            <Card.Img  src={image} className='cardimg'/>
            <Card.Body className='cardbody' >
                <Card.Title  className='cardtext'>{title}</Card.Title>
                <Card.Text  className='cardtext'>{desc}</Card.Text>
            </Card.Body>
            <button onClick={redirect} className="btn btn-primary buttonclass m-2">{buttonText}</button>
        </Card>
    );
};
export default GameCard;

