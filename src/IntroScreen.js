import React from 'react';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Welcome to Guess My Age!</h1>
        <p></p>
        Try to guess how old I am in each photo.
        <p>Exact matches earn <b>2 points</b>, and guesses within 1 year earn <b>1 point</b>.</p>
        If you achieve a perfect score, I will reveal a secret!
        <p></p>
        <button className="btn btn-primary" onClick={onStart}>Start Game</button>
      </div>
  );
};

export default IntroScreen;