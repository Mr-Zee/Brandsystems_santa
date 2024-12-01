'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const riddles = [
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
  },
  {
    question: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on the boat. Why?",
    answer: "married",
  },
  {
    question: "What has keys, but no locks; space, but no room; you can enter, but not go in?",
    answer: "keyboard",
  },
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
  },
  {
    question: "What is always in front of you but can't be seen?",
    answer: "future",
  },
];

export default function Riddle({ onComplete }: { onComplete: () => void }) {
  const [riddle] = useState(riddles[Math.floor(Math.random() * riddles.length)]);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase() === riddle.answer) {
      setFeedback('Correct! You solved the riddle!');
      setProgress(100);
      onComplete();
      setTimeout(() => {
        navigate('/question/riddle');
      }, 1000); 
    } else {
      setFeedback('Incorrect. Try again!');
    }
    setGuess('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <p className="mb-4 text-lg">{riddle.question}</p>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your answer"
          className="w-full p-2 border-2 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      <p className="text-center font-semibold">{feedback}</p>
    </div>
  );
}
