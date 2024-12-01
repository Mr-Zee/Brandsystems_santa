'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample Sudoku puzzle (0 represents an empty cell)
const puzzle = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 0],
];

// Solution to the puzzle
const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

export default function SudokuGame({ onComplete }: { onComplete: () => void }) {
  const [board, setBoard] = useState(puzzle);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (row: number, col: number, value: string) => {
    const numValue = parseInt(value, 10);

    if (isNaN(numValue) || numValue < 1 || numValue > 9) return; 
    const newBoard = board.map((rowArr, rIndex) =>
      rowArr.map((cell, cIndex) =>
        rIndex === row && cIndex === col ? numValue : cell
      )
    );
    setBoard(newBoard);
  };

  const isFixedCell = (row: number, col: number) => puzzle[row][col] !== 0;

  // Optimized completion check
  useEffect(() => {
    const completed = board.every((row, rIndex) =>
      row.every((cell, cIndex) => cell === solution[rIndex][cIndex])
    );
    setIsCompleted(completed);
  }, [board]);

  const handleComplete = () => {
    onComplete(); 
    setTimeout(() => {
      navigate('/question/sudoku'); 
    }, 1000); 
  };

  return (
    <div className="max-w-lg mx-auto text-center relative">
      <div className="grid grid-cols-9 gap-0 relative">
        {/* Vertical lines after every 3rd column */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={`vr-${index}`}
              className="h-full border-l-2 border-gray-500"
              style={{
                marginLeft: `${(index + 1) * 32}%`,
                position: 'absolute',
                zIndex: 0, 
              }}
            />
          ))}
        </div>

        {/* Grid with inputs */}
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            return (
              <React.Fragment key={`${rowIndex}-${colIndex}`}>
                <input
                  type="text"
                  maxLength={1}
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  disabled={isFixedCell(rowIndex, colIndex)}
                  className={`w-10 mt-1 border-2 h-10 text-center text-lg font-bold bg-white ${
                    isFixedCell(rowIndex, colIndex) ? 'bg-blue-400' : ''
                  } z-10`} 
                />
              </React.Fragment>
            );
          })
        )}
      </div>

      {/* Horizontal lines after every 3rd row */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={`hr-${index}`}
            className="w-full border-t-2 border-gray-500"
            style={{
              marginTop: `${(index + 1) * 26}%`, 
              position: 'absolute',
              zIndex: 0,
            }}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {!isCompleted ? (
          <p className="text-red-500 mt-10">Need to complete the puzzle!</p>
        ) : null}
        <button
          onClick={handleComplete}
          disabled={!isCompleted}
          className={`px-4 py-2 rounded-md z-10 absolute ${
            isCompleted
              ? 'bg-green-600 text-white'
              : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
        >
          Finish Puzzle
        </button>
      </div>
    </div>
  );
}
