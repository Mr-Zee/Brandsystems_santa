'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const words = [ 'MIDNIGHT', 'TAILWIND', 'CONVERSATION', 'JAVASCRIPT','UNDERTAKER'];

export default function Anagram({ onComplete }: { onComplete: () => void }) {
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setScrambled(randomWord.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess('');
    setMessage('');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toLowerCase() === word.toLowerCase()) {
      setMessage('Correct! You solved the anagram!');
      setTimeout(() => {
        onComplete(); 
        navigate('/congratulations'); 
      }, 1000); 
    } else {
      setMessage('Incorrect. Try again!');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Anagram Game</h3>
      <p className="mb-4">Unscramble this word: {scrambled}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          className="w-full p-2 border-2 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      <p className="text-center font-semibold">{message}</p>
    </div>
  );
}
