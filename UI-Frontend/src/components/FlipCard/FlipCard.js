import React, { useState } from "react";
import "./FlipCard.css";

export default function FlipCard({ frontContent, backContent, price, image }) {
  const [flip, setFlip] = useState(false);
  const flipCard = () => {
    setFlip(!flip);
  };
  return (
    <div className={`flip-card ${flip ? "back-flip" : "front-flip"}`}>
      <p className="flipCardHeader">{frontContent}</p> {/* front content */}
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={image} alt="Card" />
          <button className={`showMoreBtn ${flip ? "disabled" : ""}`} onClick={flipCard}>
            Show more...
          </button>
          <div className="action-btns">
            <p>Cost: {price}$</p>
          </div>
        </div>
        <div className="flip-card-back">
          <p className="backContent">{backContent}</p> {/* back content */}
          <button className={`returnBack ${flip ? "" : "disabled"}`} onClick={flipCard}>
            Return back...
          </button>
        </div>
      </div>
    </div>
  );
}
