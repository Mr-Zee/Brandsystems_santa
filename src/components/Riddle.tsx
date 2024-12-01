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
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentRiddle = riddles[currentRiddleIndex];

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
          setCurrentRiddleIndex((prevIndex) => (prevIndex + 1) % riddles.length);
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
        <p className="mb-4 text-lg">{riddles[currentRiddleIndex].question}</p>
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
