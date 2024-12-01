import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuestionPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { puzzleName } = useParams();
  const navigate = useNavigate();

  // Define the questions and codes for each puzzle
  const puzzles = {
    wordle: {
      question: 'Guess the 5-letter word!',
      correctCode: '1234', // You can change this code for this puzzle
    },
    sudoku: {
      question: 'Complete the Sudoku puzzle!',
      correctCode: '5678', // Change the code for this puzzle
    },
    riddle: {
      question: 'Solve the riddle: "I speak without a mouth and hear without ears."',
      correctCode: '4321', // Code for riddle puzzle
    },
    imageSymbolPuzzle: {
      question: 'Identify the symbol and provide the code.',
      correctCode: '9876', // Code for image symbol puzzle
    },
    anagram: {
      question: 'Unscramble the word: "TAELWIND"',
      correctCode: '8765', // Code for anagram puzzle
    },
  };

  const puzzle = puzzles[puzzleName as keyof typeof puzzles];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === puzzle.correctCode) {
      onComplete(); // Complete the puzzle

      // Move to the next puzzle based on the puzzleName parameter
      if (puzzleName === 'wordle') {
        navigate('/sudoku');
      } else if (puzzleName === 'sudoku') {
        navigate('/riddle');
      } else if (puzzleName === 'riddle') {
        navigate('/imageSymbolPuzzle');
      } else if (puzzleName === 'imageSymbolPuzzle') {
        navigate('/anagram');
      } else if (puzzleName === 'anagram') {
        alert('Congratulations! You have completed all puzzles!');
      }
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  return (
    <div className="question-page">
      <h2>{puzzle?.question}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={4}
          className="code-input"
          placeholder="Enter code"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default QuestionPage;
