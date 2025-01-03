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
      question: 'Code 1234',
      correctCode: '1234',
    },
    sudoku: {
      question: 'Code 1234',
      correctCode: '1234',
    },
    riddle: {
      question: 'Code 1234',
      correctCode: '1234',
    },
    // imageSymbolPuzzle: {
    //   question: 'Initiate a knowledge exchange session with the Innovation Team to acquire the necessary code.',
    //   correctCode: '1122',
    // },
    // anagram: {
    //   question: 'Engage with the Human Capital Architect for an insightful conversation to secure the final code',
    //   correctCode: '0011',
    // },
  };

  const puzzle = puzzles[puzzleName as keyof typeof puzzles];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code.toUpperCase() === puzzle.correctCode) {
      onComplete();
      if (puzzleName === 'wordle') {
        navigate('/sudoku');
      } else if (puzzleName === 'sudoku') {
        navigate('/riddle');
      } else if (puzzleName === 'riddle') {
        navigate('/anagram');
      } 
      // else if (puzzleName === 'imageSymbolPuzzle') {
      //   navigate('/anagram');
      // }
      else if (puzzleName === 'anagram') {
        alert('Congratulations! You have completed all puzzles!');
      }
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  return (
    <div className="question-page">
      <h2 className="question-title">{puzzle?.question}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="code-input"
          placeholder="Enter code"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default QuestionPage;
