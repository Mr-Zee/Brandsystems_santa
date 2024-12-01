import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router v6+

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook in React Router v6+

  const handleStartClick = () => {
    navigate('/wordle'); // Navigate to /wordle
  };

  return (
    <div className="flex items-center justify-center text-white">
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome Kishore!</h1>
        <p className="text-2xl mb-6">
          "Ho Ho Ho! It's the season of joy and magic. Let’s spread some holiday cheer and get ready for your next festive task! 🎅"
        </p>
        <p className="text-lg">
          "From Santa, with love. Merry Christmas and Happy Holidays!"
        </p>

        {/* Let's start button */}
        <button
          onClick={handleStartClick}
          className="mt-6 bg-red-500 text-white text-xl py-2 px-6 rounded-full hover:bg-red-700"
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;
