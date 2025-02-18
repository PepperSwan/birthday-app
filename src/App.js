import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const images = [
  '/images/age12.jpg',
  '/images/age13.jpg',
  '/images/age14.jpg',
  '/images/age15.jpg',
  '/images/age16.jpg',
  '/images/age17.jpg',
  '/images/age18.jpg',
  '/images/age19.jpg',
  '/images/age20.jpg',
  '/images/age21.jpg',
  '/images/age22.jpg',
  '/images/age23.jpg',
  '/images/age24.jpg',
  '/images/age25.jpg',
  '/images/age26.jpg',
  '/images/age27.jpg',
  '/images/age28.jpg',
  '/images/age29.jpg'
];

const AgeCounterApp = () => {
  const [age, setAge] = useState(12);
  const [imageIndex, setImageIndex] = useState(0);

  const changeAge = (delta) => {
    const newAge = age + delta;
    if (newAge >= 12 & newAge <= 29) {
      setAge(newAge);
      setImageIndex(newAge-12);
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
