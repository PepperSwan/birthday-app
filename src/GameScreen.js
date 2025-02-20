import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GameScreen = ({ image, userGuess, setUserGuess, handleGuess, score, highScore, feedback, fadeEffect }) => {
  const inputRef = useRef(null);

  // When fadeEffect turns false (input re-enabled), focus the input.
  useEffect(() => {
    if (!fadeEffect && inputRef.current) {
      inputRef.current.focus();
    }
  }, [fadeEffect]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <h1 className="mb-4">Guess My Age</h1>
      <div className="card p-4 shadow-lg text-center position-relative" style={{ width: '20rem' }}>
        <motion.div 
          initial={{ opacity: 1 }} 
          animate={{ opacity: fadeEffect ? 0.5 : 1 }} 
          transition={{ duration: 0.5 }}
          className="position-relative"
        >
          <img src={image} alt="Guess the age" className="img-fluid mb-3" style={{ maxHeight: '300px' }} />
          {feedback && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.3 }}
              className="position-absolute top-50 start-50 translate-middle"
              style={{ fontSize: '4rem', fontWeight: 'bold' }}
            >
              {feedback}
            </motion.div>
          )}
        </motion.div>
        <input 
          type="number" 
          className="form-control mb-2" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          onKeyDown={handleGuess} 
          placeholder="Enter age" 
          disabled={fadeEffect} 
          ref={inputRef}  // Attach the ref here
        />
        <p>Score: {score}</p>
        <p style={{ fontSize: '14px' }}>High Score: {highScore}</p>
      </div>
    </div>
  );
};

export default GameScreen;
