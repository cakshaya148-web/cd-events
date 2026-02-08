import React, { useState } from "react";
import "./EventCard.css";

function EventCard({ title, date, about, photo }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  return (
    <div className={`flip-card ${flipped ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        
        {/* FRONT FACE */}
        <div className="flip-card-front">
          <img src={photo} alt={title} className="card-img" />
          <div className="front-info">
            <h2>{title}</h2>
            <button className="view-btn" onClick={handleFlip}>
              VIEW DETAILS
            </button>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back">
          <div className="back-content">
            <h2>{title}</h2>
            <p className="event-date">Date: {date}</p>
            <p className="event-about">{about}</p>
            <button className="back-btn" onClick={handleFlip}>
              GO BACK
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventCard;