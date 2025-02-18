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
  const age29Sound = new Audio('/sounds/crowd-cheering.mp3');

  // Function to play the sound when age hits 29
  const playAge29Sound = () => {
    if (age === 29) {
      age29Sound.play();
    }
  };

  // Effect hook to play sound when age hits 29
  useEffect(() => {
    playAge29Sound();
  }, [age]);

  const changeAge = (delta) => {
    const newAge = age + delta;
    if (newAge >= 12 & newAge <= 29) {
      setAge(newAge);
      setImageIndex(newAge-12);
    }
    if (newAge == 29) {

    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ width: '20rem' }}>
        <motion.img 
          src={images[imageIndex]} 
          alt="Profile" 
          className="rounded-circle mb-3 img-fluid"
          key={imageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        />
        <h1 className="mb-3">Age: {age}</h1>
        <div className="d-flex justify-content-around">
          <button onClick={() => changeAge(-1)} className="btn btn-primary">-1 year</button>
          <button onClick={() => changeAge(1)} className="btn btn-danger">+1 Year</button>
        </div>
      </div>
    </div>
  );
};

export default AgeCounterApp;
