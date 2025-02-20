import React from 'react';

const GameOverScreen = ({ score, results, onRestart }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="mb-4">Game Over</h1>
      <p className="mb-3">Your final score: {score}</p>
      <div className="d-flex flex-wrap justify-content-center">
        {results.map((result, index) => (
          <div key={index} className="m-2 text-center">
            <img src={result.src} alt={`Age ${result.age}`} className="img-fluid" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <p className="mt-2">{result.age} {result.mark}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOverScreen;