import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import Layout from './app/layout';
import Wordle from './components/Wordle';
import MemoryGame from './components/MemoryGame';
import Riddle from './components/Riddle';
import ImageSymbolPuzzle from './components/ImageSymbolPuzzle';
import Anagram from './components/Anagram';
import QuestionPage from './components/QuestionPage';
import CongratulationPage from './components/CongratulationPage';
import HomePage from './components/Home';
import './App.css';

const App: React.FC = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState('wordle');

  const handlePuzzleCompletion = () => {
    if (currentPuzzle === 'wordle') {
      setCurrentPuzzle('sudoku');
    } else if (currentPuzzle === 'sudoku') {
      setCurrentPuzzle('riddle');
    } else if (currentPuzzle === 'riddle') {
      setCurrentPuzzle('imageSymbolPuzzle');
    } else if (currentPuzzle === 'imageSymbolPuzzle') {
      setCurrentPuzzle('anagram');
    } 
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wordle" element={<Wordle onComplete={handlePuzzleCompletion} />} />
          <Route path="/sudoku" element={<MemoryGame onComplete={handlePuzzleCompletion} />} />
          <Route path="/riddle" element={<Riddle onComplete={handlePuzzleCompletion} />} />
          <Route path="/imageSymbolPuzzle" element={<ImageSymbolPuzzle onComplete={handlePuzzleCompletion} />} />
          <Route path="/anagram" element={<Anagram onComplete={handlePuzzleCompletion} />} />
          <Route path="/question/:puzzleName" element={<QuestionPage onComplete={handlePuzzleCompletion} />} />
          <Route path="/congratulations" element={<CongratulationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
