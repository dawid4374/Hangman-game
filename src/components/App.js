import React, { useEffect, useState } from "react";
import Hangman from "./Hangman";
import CorrectLetters from "./CorrectLetters";
import MissedLetters from "./MissedLetters";
import Toast from "light-toast";

const App = () => {
  const [word, setWord] = useState([]);
  const [missed, setMissed] = useState([]);
  const [lives, setLives] = useState(11);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((res) => res.json())
      .then((word) => {
        let strArr = word.join();
        strArr = strArr.split("");

        let newStrArr = strArr.map((item) => {
          return {
            name: item,
            correct: false,
          };
        });
        setWord(newStrArr);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode >= 65 && e.keyCode <= 90 && lives > 0) {
        let strLetter = e.key.toLowerCase();

        if (
          !missed.includes(strLetter) &&
          !word.find((letter) => letter.name === strLetter)
        ) {
          setMissed((missed) => [...missed, strLetter]);
          setLives((lives) => lives - 1);
        } else {
          if (!word.find((letter) => letter.name === strLetter)) {
            alert("Already checked! Try another letter :)");
          }
        }

        setWord((word) =>
          word.map((letter) =>
            letter.name === strLetter ? { ...letter, correct: true } : letter
          )
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [word, missed, lives]);

  return (
    <>
      {word.length > 0 ? (
        <div className="wrapper">
          <div className="top">
            <Hangman lives={lives} />
            <MissedLetters missed={missed} />
          </div>
          <div className="bottom">
            <CorrectLetters word={word} />
          </div>
          <div className="blue-corner"></div>
          {lives < 1 &&
            Toast.fail("Game Over!", 3000, () => window.location.reload())}
          {!word.find((letter) => letter.correct === false) &&
            Toast.success("You Win!", 3000, () => window.location.reload())}
        </div>
      ) : (
        <>
          {Toast.loading("Loading")}
          {Toast.hide()}
        </>
      )}
    </>
  );
};

export default App;
