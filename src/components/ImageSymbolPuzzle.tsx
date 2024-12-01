'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type SequencePuzzle = {
  sequence: number[];
  operation: string; // "addition", "subtraction", "multiplication", "division"
  missingIndex: number; // the index of the missing number
};

const generatePuzzle = (): SequencePuzzle => {
  const operations = ['addition', 'subtraction', 'multiplication', 'division'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // Generate a sequence based on the operation
  let sequence: number[] = [];
  let startValue = Math.floor(Math.random() * 10) + 1; // starting number between 1 and 10
  let missingIndex = Math.floor(Math.random() * 5); // random missing index between 0 and 4

  for (let i = 0; i < 6; i++) {
    if (i === missingIndex) {
      sequence.push(-1); // -1 indicates the missing value
    } else {
      switch (operation) {
        case 'addition':
          startValue += Math.floor(Math.random() * 5) + 1; // add a random number between 1 and 5
          sequence.push(startValue);
          break;
        case 'subtraction':
          startValue -= Math.floor(Math.random() * 5) + 1; // subtract a random number between 1 and 5
          sequence.push(startValue);
          break;
        case 'multiplication':
          startValue *= Math.floor(Math.random() * 2) + 2; // multiply by 2 or 3
          sequence.push(startValue);
          break;
        case 'division':
          startValue = Math.floor(Math.random() * 5) + 5; // start with a number > 5
          sequence.push(startValue);
          break;
      }
    }
  }

  return { sequence, operation, missingIndex };
};

export default function MathSequencePuzzle({ onComplete }: { onComplete: () => void }) {
  const [puzzle, setPuzzle] = useState<SequencePuzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | string>(''); // answer input by user
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    setPuzzle(generatePuzzle());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (puzzle && userAnswer !== '') {
      const correctAnswer = calculateMissingValue(puzzle.sequence, puzzle.operation, puzzle.missingIndex);

      if (parseInt(userAnswer.toString(), 10) === correctAnswer) {
        setFeedback('Correct! Moving to the next puzzle...');
        setUserAnswer('');
        setTimeout(() => {
          onComplete(); 
          navigate('/question/imageSymbolPuzzle'); 
        }, 1000);
      } else {
        setFeedback(`Incorrect! The correct answer was ${correctAnswer}`);
        setUserAnswer('');
        setTimeout(() => {
          setPuzzle(generatePuzzle()); 
          setFeedback('');
        }, 2000);
      }
    }
  };

  const calculateMissingValue = (sequence: number[], operation: string, missingIndex: number) => {
    let value = sequence[missingIndex - 1]; // start with the previous number
    switch (operation) {
      case 'addition':
        value += sequence[missingIndex + 1] - sequence[missingIndex - 1]; // find the difference between next and prev to add
        break;
      case 'subtraction':
        value -= sequence[missingIndex + 1] - sequence[missingIndex - 1]; // reverse the subtraction
        break;
      case 'multiplication':
        value *= sequence[missingIndex + 1] / sequence[missingIndex - 1]; // reverse the multiplication
        break;
      case 'division':
        value = sequence[missingIndex + 1] * sequence[missingIndex - 1]; // reverse the division
        break;
    }
    return value;
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Math Sequence Puzzle</h3>
      {puzzle && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="text-xl font-semibold">
              {puzzle.sequence.map((value, index) => (
                <span key={index} className="mx-2">
                  {value === -1 ? '?' : value}
                </span>
              ))}
            </div>
          </div>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter the missing number"
            className="w-full p-2 border-2 rounded"
          />
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      )}
      {feedback && (
        <p
          className={`mt-4 text-center font-semibold ${
            feedback.startsWith('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
