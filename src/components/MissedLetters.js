import React from "react";

const MissedLetters = ({ missed }) => {
  return (
    <div className="missed-wrapper">
      <h1>You missed:</h1>
      {missed.map((letter, idx) => (
        <div className="missed" key={idx}>
          <b className="missed-letter">{letter}</b>
        </div>
      ))}
    </div>
  );
};

export default MissedLetters;
