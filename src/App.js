import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const allImages = [
  { src: '/images/age12_1.png', age: 12 },
  { src: '/images/age12_2.png', age: 12 },
  { src: '/images/age13_1.png', age: 13 },
  { src: '/images/age13_2.png', age: 13 },
  { src: '/images/age13_3.png', age: 13 },
  { src: '/images/age14_1.png', age: 14 },
  { src: '/images/age14_2.png', age: 14 },
  { src: '/images/age15_1.png', age: 15 },
  { src: '/images/age15_2.png', age: 15 },
  { src: '/images/age15_3.png', age: 15 },
  { src: '/images/age16_1.png', age: 16 },
  { src: '/images/age16_2.png', age: 16 },
  { src: '/images/age16_3.png', age: 16 },
  { src: '/images/age17_1.png', age: 17 },
  { src: '/images/age17_2.png', age: 17 },
  { src: '/images/age17_3.png', age: 17 },
  { src: '/images/age18_1.png', age: 18 },
  { src: '/images/age18_2.png', age: 18 },
  { src: '/images/age19_1.png', age: 19 },
  { src: '/images/age19_2.png', age: 19 },
  { src: '/images/age20_1.png', age: 20 },
  { src: '/images/age20_2.png', age: 20 },
  { src: '/images/age21_1.png', age: 21 },
  { src: '/images/age21_2.png', age: 21 },
  { src: '/images/age22_1.png', age: 22 },
  { src: '/images/age22_2.png', age: 22 },
  { src: '/images/age23_1.png', age: 23 },
  { src: '/images/age23_2.png', age: 23 },
  { src: '/images/age24_1.png', age: 24 },
  { src: '/images/age24_2.png', age: 24 },
  { src: '/images/age25_1.png', age: 25 },
  { src: '/images/age25_2.png', age: 25 },
  { src: '/images/age26_1.png', age: 26 },
  { src: '/images/age26_2.png', age: 26 },
  { src: '/images/age27_1.png', age: 27 },
  { src: '/images/age27_2.png', age: 27 },
  { src: '/images/age28_1.png', age: 28 },
  { src: '/images/age28_2.png', age: 28 },
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const AgeGuessingGame = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('highScore')) || 0);
  const [userGuess, setUserGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]);
  const correctSound = new Audio('/sounds/correct.m4a');
  const closeSound = new Audio('/sounds/close.m4a');
  const incorrectSound = new Audio('/sounds/incorrect.m4a');
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    setShuffledImages(shuffleArray(allImages).slice(0, 10));
  }, []);

  const handleGuess = (event) => {
    if (event.key && event.key !== 'Enter') return;
    const actualAge = shuffledImages[currentIndex]?.age;
    const guessedAge = parseInt(userGuess);
    if (!actualAge || isNaN(guessedAge)) return;
    let points = 0;
    let mark = '❌';
    
    if (guessedAge === actualAge) {
      points = 2;
      mark = '✅';
      correctSound.play();
    } else if (guessedAge === actualAge + 1 || guessedAge === actualAge - 1) {
      points = 1;
      mark = '🟠';
      closeSound.play();
    } else {
      incorrectSound.play();
    }

    setScore(score + points);
    setResults([...results, { ...shuffledImages[currentIndex], guess: guessedAge, mark }]);
    
    if (currentIndex < shuffledImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserGuess('');
    } else {
      setGameOver(true);
      if (score + points > highScore) {
        setHighScore(score + points);
        localStorage.setItem('highScore', score + points);
      }
      if (score + points === 20) {
        setShowSecret(true);
      }
    }
  };

  if (showIntro) {
    return (
      <div className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Welcome to Guess My Age!</h1>
        <p>Try to guess the correct age. Exact matches earn 2 points, and guesses within 1 year earn 1 point.</p>
        <button className="btn btn-primary" onClick={() => setShowIntro(false)}>Start Game</button>
      </div>
    );
  }

  if (showSecret) {
    return (
      <div className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Well done!</h1>
        <p>You achieved the highest possible score!</p>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100">
        <h1>Game Over</h1>
        <p>Your final score: {score}</p>
        <div className="d-flex flex-wrap justify-content-center">
          {results.map((result, index) => (
            <div key={index} className="m-2 text-center">
              <img src={result.src} alt="result" className="img-fluid" style={{ width: '100px', height: '100px' }} />
              <p>{result.age} {result.mark}</p>
              <p>Your Guess: {result.guess}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1>Guess My Age</h1>
      <div className="card p-4 shadow-lg text-center" style={{ width: '20rem' }}>
        <img src={shuffledImages[currentIndex]?.src} alt="Guess the age" className="img-fluid mb-3" />
        <input 
          type="number" 
          className="form-control mb-2 text-center" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)}
          onKeyDown={handleGuess}
        />
        <button className="btn btn-success mb-3" onClick={handleGuess}>Submit</button>
        <h3>Score: {score}</h3>
        <h5 className="text-muted">High Score: {highScore}</h5>
      </div>
    </div>
  );
};

export default AgeGuessingGame;
