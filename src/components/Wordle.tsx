'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const words = ['REACT'];

export default function Wordle({ onComplete }: { onComplete: () => void }) {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<Array<{ color: string; letter: string }[]>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const startNewGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuess('');
    setAttempts(0);
    setFeedback([]);
    setGameOver(false);
    setMessage('');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.length !== word.length) return;

    const newFeedback = guess.split('').map((letter, index) => ({
      letter,
      color: letter === word[index]
        ? 'bg-green-500'
        : word.includes(letter)
        ? 'bg-yellow-500'
        : 'bg-gray-500',
    }));

    setFeedback([...feedback, newFeedback]);
    setAttempts(attempts + 1);

    if (guess === word) {
      setGameOver(true);
      setMessage('Congratulations! You guessed the word!');
      setTimeout(() => {
        navigate('/question/wordle'); 
      }, 1000); 
    } else if (attempts >= 5) {
      setGameOver(true);
      setMessage(`Game Over. The word was ${word}. Try again!`);
    }

    setGuess('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Wordle Game</h3>
      
      {!gameOver && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            placeholder="Enter your guess"
            maxLength={word.length}
            className="w-full p-2 border-2 rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      )}
      <div className="grid grid-rows-5 gap-2 mb-4">
        {feedback.map((attempt, index) => (
          <div key={index} className="flex space-x-2 justify-center">
            {attempt.map((letter, i) => (
              <div
                key={i}
                className={`w-12 h-12 text-xl flex items-center justify-center rounded ${letter.color}`}
              >
                {letter.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="text-center font-semibold">{message}</p>
    </div>
  );
}
