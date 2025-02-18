import React, { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/images/age1.jpg',
  '/images/age2.jpg',
  '/images/age3.jpg',
  '/images/age4.jpg',
  '/images/age5.jpg'
];

const AgeCounterApp = () => {
  const [age, setAge] = useState(25);
  const [imageIndex, setImageIndex] = useState(0);

  const changeAge = (delta) => {
    const newAge = age + delta;
    if (newAge >= 0) {
      setAge(newAge);
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="w-80 shadow-xl rounded-2xl p-4 bg-white">
        <div className="flex flex-col items-center">
          <motion.img
            src={images[imageIndex]}
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover shadow-lg mb-4"
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-xl font-semibold mb-2">Age: {age}</h1>
          <div className="flex space-x-4">
            <button onClick={() => changeAge(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+1 Year</button>
            <button onClick={() => changeAge(-1)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">-1 Year</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCounterApp;
