import React, { useEffect, useRef } from "react";
import { saveScore } from "./saveScore";
import { saveResults } from "./saveResults";

const SecretScreen = ({ allImages, score, results, userName }) => {
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!hasSaved.current) {
      saveScore(userName, score);
      saveResults(userName, results);
      hasSaved.current = true;
    }
  }, [userName, score, results]);

  // Decide how many cells we want to fill in the grid
  const totalCells = 100; // Adjust this number as needed

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Tiled Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gridAutoRows: '100px',
          opacity: 0.5,
          zIndex: 0
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => {
          // Cycle through the images using modulus operator
          const image = allImages[index % allImages.length];
          return (
            <img
              key={index}
              src={image.src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          );
        })}
      </div>

      {/* Secret Content */}
      <div
        className="text-center d-flex flex-column align-items-center justify-content-center min-vh-100"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent black background
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' // text outline effect
        }}
      >
        <h1>Well done!</h1>
        <p>You achieved a perfect score!</p>
        <p>😱 😱 😱 😱 😱</p>
        <p>
          Now I shall reveal to you my secret...<br />
          <b>The true story of the name "Pepper Swan"!</b>
        </p>
        <h2>🌶️ 🦢</h2>
        <p>
          Basically...<br /> I fancied a guy in school who said Pepper was a cool name, so I made it my nickname.<br />
          I felt like it needed a last name, so I took Swan from Bella Swan... A character in Twilight.
        </p>
        <p><i>I have never even seen Twilight.</i></p>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          Play Again..?
        </button>
      </div>
    </div>
  );
};

export default SecretScreen;
