import React, { useState } from 'react';
import IntroScreen from './IntroScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import SecretScreen from './SecretScreen';

const correctSound = new Audio('/sounds/correct.m4a');
const closeSound = new Audio('/sounds/close.m4a');
const incorrectSound = new Audio('/sounds/incorrect.m4a');

const allImages = [
  { src: '/images/age7_1.png', age: 7 },
  { src: '/images/age8_1.png', age: 8 },
  { src: '/images/age9_1.png', age: 9 },
  { src: '/images/age10_1.png', age: 10 },
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
  { src: '/images/age18_3.png', age: 18 },
  { src: '/images/age19_1.png', age: 19 },
  { src: '/images/age19_2.png', age: 19 },
  { src: '/images/age19_3.png', age: 19 },
  { src: '/images/age20_1.png', age: 20 },
  { src: '/images/age20_2.png', age: 20 },
  { src: '/images/age20_3.png', age: 20 },
  { src: '/images/age21_1.png', age: 21 },
  { src: '/images/age21_2.png', age: 21 },
  { src: '/images/age22_1.png', age: 22 },
  { src: '/images/age22_2.png', age: 22 },
  { src: '/images/age22_3.png', age: 22 },
  { src: '/images/age23_1.png', age: 23 },
  { src: '/images/age23_2.png', age: 23 },
  { src: '/images/age23_3.png', age: 23 },
  { src: '/images/age24_1.png', age: 24 },
  { src: '/images/age24_2.png', age: 24 },
  { src: '/images/age24_3.png', age: 24 },
  { src: '/images/age25_1.png', age: 25 },
  { src: '/images/age25_2.png', age: 25 },
  { src: '/images/age25_3.png', age: 25 },
  { src: '/images/age26_1.png', age: 26 },
  { src: '/images/age26_2.png', age: 26 },
  { src: '/images/age26_3.png', age: 26 },
  { src: '/images/age27_1.png', age: 27 },
  { src: '/images/age27_2.png', age: 27 },
  { src: '/images/age27_3.png', age: 27 },
  { src: '/images/age28_1.png', age: 28 },
  { src: '/images/age28_2.png', age: 28 },
  { src: '/images/age28_3.png', age: 28 },
];

const AgeGuessingGame = () => {
  const [screen, setScreen] = useState('intro');
  const [gameImages, setGameImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('highScore')) || 0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [fadeEffect, setFadeEffect] = useState(false);

  const startGame = () => {
    const shuffledImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 10);
    setGameImages(shuffledImages);
    setCurrentIndex(0);
    setScore(0);
    setResults([]);
    setFeedback(null);
    setFadeEffect(false);
    setScreen('game');
  };

  const handleGuess = (e) => {
    if (e.key === 'Enter') {
      const correctAge = gameImages[currentIndex].age;
      let points = 0;
      let mark = '❌';
      let sound = incorrectSound;

      if (parseInt(userGuess) === correctAge) {
        points = 2;
        mark = '✅';
        sound = correctSound;
      } else if (Math.abs(parseInt(userGuess) - correctAge) === 1) {
        points = 1;
        mark = '🟠';
        sound = closeSound;
      }
      
      sound.play();
      setFeedback(mark);
      setFadeEffect(true);
      
      setTimeout(() => {
        setFeedback(null);
        setFadeEffect(false);
      }, 1000);

      setScore(score + points);
      setResults([...results, { src: gameImages[currentIndex].src, age: correctAge, mark }]);
      setUserGuess('');
      
      if (currentIndex < gameImages.length - 1) {
        setTimeout(() => setCurrentIndex(currentIndex + 1), 1000);
      } else {
        if (score + points > highScore) {
          setHighScore(score + points);
          localStorage.setItem('highScore', score + points);
        }
        setTimeout(() => setScreen(score + points === 20 ? 'secret' : 'gameover'), 1000);
      }
    }
  };

  return (
    <div>
      {screen === 'intro' && <IntroScreen onStart={startGame} />}
      {screen === 'game' && (
        <GameScreen 
          image={gameImages[currentIndex]?.src} 
          userGuess={userGuess} 
          setUserGuess={setUserGuess} 
          handleGuess={handleGuess} 
          score={score} 
          highScore={highScore} 
          feedback={feedback}
          fadeEffect={fadeEffect}
        />
      )}
      {screen === 'gameover' && <GameOverScreen score={score} results={results} onRestart={startGame} />}
      {screen === 'secret' && <SecretScreen />}
    </div>
  );
};

export default AgeGuessingGame;
