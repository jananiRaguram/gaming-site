import React from "react";
import classnames from "classnames";
import "../styles/card.css"
import Card from "react-bootstrap/Card";
import FrontCard from "../images/front_card.png";

const MatchCard = ({ onClick, card, index, isInactive, isFlipped }) => {
  const handleClick = () => {
    if (!isFlipped && !isInactive) {
      onClick(index);
    }
  };

  return (
    <div className="p-2 card-container">
      {/* use isInactive css or isFlipped css when card is in either of these states */}
      <div 
        className={classnames("gamecard", {
            "inactive-card": isInactive,
            "flipped-card": isFlipped
        })}
        onClick={handleClick}
      >
        {/* make sure cards are on top of each other and cover the full height and width */}
        <Card className="card-face" style={{position: "absolute", height:"100%", width:"100%"}}>
          <Card.Img 
            src={FrontCard} 
            alt="card front"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            className="card-face-front"
          />
        </Card>
        <Card className="card-face card-back-face">
          <Card.Img 
            className="imagename" 
            src={card.image} 
            alt="card back"
            loading="lazy" // lazy load images for performance improvements when flipping card
          />
        </Card>
      </div>
    </div>
  );
};

export default MatchCard;
