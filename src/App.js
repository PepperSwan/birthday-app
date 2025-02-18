import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const images = [
  '/images/age12.png',
  '/images/age13.png',
  '/images/age14.png',
  '/images/age15.png',
  '/images/age16.png',
  '/images/age17.png',
  '/images/age18.png',
  '/images/age19.png',
  '/images/age20.png',
  '/images/age21.png',
  '/images/age22.png',
  '/images/age23.png',
  '/images/age24.png',
  '/images/age25.png',
  '/images/age26.png',
  '/images/age27.png',
  '/images/age28.png',
  '/images/age29.png'
];

const AgeCounterApp = () => {
  const [age, setAge] = useState(12);
  const [imageIndex, setImageIndex] = useState(0);

  // Create an audio element for the sound effect
  const audio = new Audio('/sounds/crowd-cheering.mp3');  // Correct path to the sound file

  const changeAge = (delta) => {
    const newAge = age + delta;
    if (newAge >= 12 && newAge <= 29) {
      setAge(newAge);
      setImageIndex(newAge - 12);
    }
    if (newAge == 29) {
      audio.play()
    }
  };

  // Function to animate the button when age is 28
  const getButtonAnimation = () => {
    if (age === 28) {
      return {
        x: Math.random() * 200 - 100,  // Random horizontal movement
        y: Math.random() * 200 - 100,  // Random vertical movement
        transition: { duration: 0.5 }   // Animation duration
      };
    }
    return {};  // No animation when age isn't 28
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="mb-4 text-center">Change Oliver's Age!</h1>

      <div className="card p-4 shadow-lg text-center" style={{ width: '20rem' }}>
        <div className="d-flex justify-content-center mb-3">
          <img 
            src={images[imageIndex]} 
            alt="Profile" 
            className="rounded-circle" 
            style={{ width: '250px', height: '252px' }} // Fix image size
          />
        </div>
        <h2 className="mb-3">Age: {age}</h2>
        <div className="d-flex justify-content-around">
          <button onClick={() => changeAge(-1)} className="btn btn-primary" disabled={age <= 12}>-1 year</button>
          <motion.button 
            onClick={() => changeAge(1)} 
            className="btn btn-danger" 
            disabled={age >= 29} 
            style={{ position: 'relative' }} // Ensure the button can move freely
            animate={getButtonAnimation()} // Apply random movement when age = 28
          >
            +1 Year
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AgeCounterApp;
