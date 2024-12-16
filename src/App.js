import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SortingVisualizer from './pages/SortingVisualizer';
import NotesPage from './pages/NotesPage';
import Header from './components/Header';
import Footer from './components/Footer'; 

// App
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-800 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center p-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/visualizer" element={<SortingVisualizer />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;