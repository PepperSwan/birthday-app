import React from 'react';

const GameScreen = ({ image, userGuess, setUserGuess, handleGuess, score, highScore }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="mb-4">Guess My Age</h1>
      <div className="card p-4 shadow-lg text-center" style={{ width: '20rem' }}>
        <img src={image} alt="Guess the age" className="img-fluid mb-3" style={{ maxHeight: '300px' }} />
        <input 
          type="number" 
          className="form-control mb-2" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          onKeyDown={handleGuess} 
          placeholder="Enter age" 
        />
        <p>Score: {score}</p>
        <p style={{ fontSize: '14px' }}>High Score: {highScore}</p>
      </div>
    </div>
  );
};

export default GameScreen;
