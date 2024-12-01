"use client";

import { useState, useEffect } from "react";
import Wordle from "../components/Wordle";
import ImageSymbolPuzzle from "../components/ImageSymbolPuzzle";
import MemoryGame from "../components/MemoryGame";
import Anagram from "../components/Anagram";
import Riddle from "../components/Riddle";

const levels = [
  { name: "Wordle", component: Wordle },
  { name: "Image Symbol Puzzle", component: ImageSymbolPuzzle },
  { name: "Memory Game", component: MemoryGame },
  { name: "Anagram", component: Anagram },
  { name: "Riddle", component: Riddle },
];

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelCodes, setLevelCodes] = useState<string[]>([]);
  const [codeInput, setCodeInput] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    setLevelCodes(
      Array.from({ length: levels.length - 1 }, () =>
        Math.floor(100 + Math.random() * 900).toString()
      )
    );
  }, []);

  const handleLevelComplete = () => {
    if (currentLevel < levels.length - 1) {
      setShowCodeInput(true);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeInput === levelCodes[currentLevel]) {
      setCurrentLevel(currentLevel + 1);
      setShowCodeInput(false);
      setCodeInput("");
    } else {
      alert("Incorrect code. Try again!");
    }
  };

  const CurrentGame = levels[currentLevel].component;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Puzzle Game</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Level {currentLevel + 1}: {levels[currentLevel].name}
        </h2>
        {showCodeInput ? (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <p>Enter the 3-digit code to proceed to the next level:</p>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              maxLength={3}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
            >
              Submit Code
            </button>
          </form>
        ) : (
          <CurrentGame onComplete={handleLevelComplete} />
        )}
      </div>
    </main>
  );
}
