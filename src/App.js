import React, { useState } from 'react';
import IntroScreen from './IntroScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import SecretScreen from './SecretScreen';
<img src={'/images/introbanner2.png'} alt="intro banner" className="img-fluid mb-3" style={{ maxHeight: '150px' }} />

const correctSound = new Audio('/sounds/correct.m4a');
const closeSound = new Audio('/sounds/close.m4a');
const incorrectSound = new Audio('/sounds/incorrect.m4a');

const allImages = [
  { src: '/images/age1.png', age: 7, id: 1 },
  { src: '/images/age2.png', age: 8, id: 2 },
  { src: '/images/age3.png', age: 9, id: 3 },
  { src: '/images/age4.png', age: 10, id: 4 },
  { src: '/images/age5.png', age: 12, id: 5 },
  { src: '/images/age6.png', age: 12, id: 6 },
  { src: '/images/age7.png', age: 13, id: 7 },
  { src: '/images/age8.png', age: 13, id: 8 },  // was "/images/age13_2.png"
  { src: '/images/age9.png', age: 13, id: 9 },  // was "/images/age13_3.png"
  { src: '/images/age10.png', age: 14, id: 10 }, // was "/images/age14_1.png"
  { src: '/images/age11.png', age: 14, id: 11 }, // was "/images/age14_2.png"
  { src: '/images/age12.png', age: 15, id: 12 }, // was "/images/age15_1.png"
  { src: '/images/age13.png', age: 15, id: 13 }, // was "/images/age15_2.png"
  { src: '/images/age14.png', age: 15, id: 14 }, // was "/images/age15_3.png"
  { src: '/images/age15.png', age: 16, id: 15 }, // was "/images/age16_1.png"
  { src: '/images/age16.png', age: 16, id: 16 }, // was "/images/age16_2.png"
  { src: '/images/age17.png', age: 16, id: 17 }, // was "/images/age16_3.png"
  { src: '/images/age18.png', age: 17, id: 18 }, // was "/images/age17_1.png"
  { src: '/images/age19.png', age: 17, id: 19 }, // was "/images/age17_2.png"
  { src: '/images/age20.png', age: 17, id: 20 }, // was "/images/age17_3.png"
  { src: '/images/age21.png', age: 18, id: 21 }, // was "/images/age18_1.png"
  { src: '/images/age22.png', age: 18, id: 22 }, // was "/images/age18_2.png"
  { src: '/images/age23.png', age: 18, id: 23 }, // was "/images/age18_3.png"
  { src: '/images/age24.png', age: 19, id: 24 }, // was "/images/age19_1.png"
  { src: '/images/age25.png', age: 19, id: 25 }, // was "/images/age19_2.png"
  { src: '/images/age26.png', age: 19, id: 26 }, // was "/images/age19_3.png"
  { src: '/images/age27.png', age: 20, id: 27 }, // was "/images/age20_1.png"
  { src: '/images/age28.png', age: 20, id: 28 }, // was "/images/age20_2.png"
  { src: '/images/age29.png', age: 20, id: 29 }, // was "/images/age20_3.png"
  { src: '/images/age30.png', age: 21, id: 30 }, // was "/images/age21_1.png"
  { src: '/images/age31.png', age: 21, id: 31 }, // was "/images/age21_2.png"
  { src: '/images/age32.png', age: 22, id: 32 }, // was "/images/age22_1.png"
  { src: '/images/age33.png', age: 22, id: 33 }, // was "/images/age22_2.png"
  { src: '/images/age34.png', age: 22, id: 34 }, // was "/images/age22_3.png"
  { src: '/images/age35.png', age: 23, id: 35 }, // was "/images/age23_1.png"
  { src: '/images/age36.png', age: 23, id: 36 }, // was "/images/age23_2.png"
  { src: '/images/age37.png', age: 23, id: 37 }, // was "/images/age23_3.png"
  { src: '/images/age38.png', age: 24, id: 38 }, // was "/images/age24_1.png"
  { src: '/images/age39.png', age: 24, id: 39 }, // was "/images/age24_2.png"
  { src: '/images/age40.png', age: 24, id: 40 }, // was "/images/age24_3.png"
  { src: '/images/age41.png', age: 25, id: 41 }, // was "/images/age25_1.png"
  { src: '/images/age42.png', age: 25, id: 42 }, // was "/images/age25_2.png"
  { src: '/images/age43.png', age: 25, id: 43 }, // was "/images/age25_3.png"
  { src: '/images/age44.png', age: 26, id: 44 }, // was "/images/age26_1.png"
  { src: '/images/age45.png', age: 26, id: 45 }, // was "/images/age26_2.png"
  { src: '/images/age46.png', age: 26, id: 46 }, // was "/images/age26_3.png"
  { src: '/images/age47.png', age: 27, id: 47 },
  { src: '/images/age48.png', age: 27, id: 48 },
  { src: '/images/age49.png', age: 27, id: 49 }, 
  { src: '/images/age50.png', age: 28, id: 50 },
  { src: '/images/age51.png', age: 28, id: 51 },
  { src: '/images/age52.png', age: 28, id: 52 } 
];

const AgeGuessingGame = () => {
  const [screen, setScreen] = useState('intro');
  const [gameImages, setGameImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('highScore')) || 0);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [fadeEffect, setFadeEffect] = useState(false);

  const startGame = () => {
    const shuffledImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 9);
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
      setResults([...results, {
        src: gameImages[currentIndex].src,
        id: gameImages[currentIndex].id,
        age: correctAge,
        guess: userGuess,
        mark
      }]);
      setUserGuess('');
      
      if (currentIndex < gameImages.length - 1) {
        setTimeout(() => setCurrentIndex(currentIndex + 1), 1000);
      } else {
        if (score + points > highScore) {
          setHighScore(score + points);
          localStorage.setItem('highScore', score + points);
        }
        setTimeout(() => setScreen(score + points === 18 ? 'secret' : 'gameover'), 1000);
      }
    }
  };

  return (
    <div>
      {screen === 'intro' && <IntroScreen userName={userName} setUserName={setUserName} onStart={startGame} />}
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
      {screen === 'gameover' && (
        <GameOverScreen
          score={score}
          results={results}
          userName={userName}
          onRestart={startGame}
        />
      )}
      {screen === 'secret' && (
        <SecretScreen
          allImages={allImages}
          score={score}
          results={results}
          userName={userName}
        />
      )}
    </div>
  );
};

export default AgeGuessingGame;
