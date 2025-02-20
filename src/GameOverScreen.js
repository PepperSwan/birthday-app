import React, { useEffect , useRef } from "react";
import { saveScore } from "./saveScore";
import { saveResults } from "./saveResults";

const GameOverScreen = ({ score, results, onRestart, userName }) => {
    const hasSaved = useRef(false);

    useEffect(() => {
        if (!hasSaved.current) {
          saveScore(userName, score);
          saveResults(userName, results);
          hasSaved.current = true;
        }
      }, [userName, score, results]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #f8cdda, #1c92d2)',
        animation: 'gradientShift 10s ease infinite'
      }}
    >
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="mb-4">Game Over, {userName}.</h1>
      <p className="mb-3">Your final score: {score}</p>
      <div className="d-flex flex-wrap justify-content-center">
        {results.map((result, index) => (
          <div key={index} className="m-2 text-center">
            <img src={result.src} alt={`Age ${result.age}`} className="img-fluid" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <p>
              Age: {result.age} {result.mark}<br />
              Guess: {result.guess}
            </p>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={onRestart}>Play Again</button>
    </div>
    </div>
  );
};

export default GameOverScreen;
