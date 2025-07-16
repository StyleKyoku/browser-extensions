import React from "react";

const Card = ({ item, onToggle, onRemove }) => {
  return (
    <div className="card">
        <div className="card-content">
            <img src={item.logo} alt={item.name} className="card-icon" />
            <div className="card-text"> 
                <h3 className="card-title">{item.name}</h3>
                <p className="card-description">{item.description}</p>
            </div>
        </div>
        <div className="card-action">
            <button 
              className="remove-button"
              onClick={onRemove}
            >
              Remove
            </button>
            <button
              className={`toggle-button ${item.isActive ? "toggled" : ""}`}
              onClick={onToggle}>
              <div className="thumb"></div>
            </button>
        </div>
    </div>
  );
}

export default Card;