'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const riddles = [
  {
    question: "I am a container with no lock, but I can hold what's hot and keep it from going cold. What am I?",
    answer: "thermos",
  },
  {
    question: "I fly without wings, I cry without eyes. Wherever I go, darkness flies. What am I?",
    answer: "cloud",
  },
  {
    question: "I am not alive, but I can grow. I don’t have lungs, but I need air. What am I?",
    answer: "fire",
  },
  {
    question: "The more of me you take, the more you leave behind. What am I?",
    answer: "footsteps",
  },
  {
    question: "I am an odd number. Take away one letter, and I become even. What am I?",
    answer: "seven",
  },
];

export default function Riddle({ onComplete }: { onComplete: () => void }) {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shuffledRiddles, setShuffledRiddles] = useState(riddles);
  const navigate = useNavigate();

  // Shuffle riddles on component mount
  useEffect(() => {
    const shuffled = [...riddles].sort(() => Math.random() - 0.5);
    setShuffledRiddles(shuffled);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentRiddle = shuffledRiddles[currentRiddleIndex];

    if (guess.toLowerCase() === currentRiddle.answer) {
      setFeedback('Correct! You solved the riddle!');
      setCorrectAnswers(correctAnswers + 1);

      // Move to the next level if 2 correct answers
      if (correctAnswers + 1 >= 2) {
        setTimeout(() => {
          navigate('/question/riddle');
        }, 1000);
      } else {
        // Move to the next riddle
        setTimeout(() => {
          setFeedback('');
          setGuess('');
          setCurrentRiddleIndex((prevIndex) => (prevIndex + 1) % shuffledRiddles.length);
        }, 1000);
      }
    } else {
      setFeedback('Incorrect. Try again!');
    }
    setGuess('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <p className="mb-4 text-lg">{shuffledRiddles[currentRiddleIndex].question}</p>
      </div>
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
      <div className="mt-4">
        <p className="text-center">Correct Answers: {correctAnswers}</p>
      </div>
    </div>
  );
}
