import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const images = [
  '/images/age1.jpg',
  '/images/age2.jpg',
  '/images/age3.jpg',
  '/images/age4.jpg',
  '/images/age5.jpg'
];

const AgeCounterApp = () => {
  const [age, setAge] = useState(12);
  const [imageIndex, setImageIndex] = useState(0);

  const changeAge = (delta) => {
    const newAge = age + delta;
    if (newAge >= 12 & newAge <= 29) {
      setAge(newAge);
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
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
          transition={{ duration: 0.5 }}
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
