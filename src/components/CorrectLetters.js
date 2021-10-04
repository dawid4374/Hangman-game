import React from "react";

const CorrectLetters = ({ word }) => {
  return (
    <>
      {word &&
        word.map((letter, idx) => (
          <div
            className="letter-wrapper"
            key={idx}
            style={
              letter.correct
                ? { backgroundColor: "green" }
                : { backgroundColor: "gray" }
            }
          >
            <b
              className="letter"
              style={
                letter.correct ? { color: "white" } : { color: "transparent" }
              }
            >
              {letter.name}
            </b>
          </div>
        ))}
    </>
  );
};

export default CorrectLetters;
