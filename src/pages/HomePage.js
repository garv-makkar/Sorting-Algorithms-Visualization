import React from 'react';
import { Link } from 'react-router-dom';

// Home Page
const HomePage = () => {
  return (
    <div className="text-center mb-5">
      <h1 className="text-4xl font-bold mb-5">Welcome to Sorting Visualizer</h1>
      <p className="text-xl mb-5">Explore different sorting algorithms and see them in action!</p>
      <Link to="/visualizer">
        <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded mb-3">
          Go to Visualizer
        </button>
      </Link>
      <br />
      <Link to="/notes">
        <button className="p-2 bg-green-600 hover:bg-green-700 rounded">
          Learn About Sorting Algorithms
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
