import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';
import insertionSort from '../algorithms/insertionSort';
import selectionSort from '../algorithms/selectionSort';
import heapSort from '../algorithms/heapSort';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MIN_ARRAY_LENGTH = 10;
const MAX_ARRAY_LENGTH = 200;

const ErrorFallback = ({ error }) => (
  <div className="text-red-500">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

// Sorting Visualizer
const SortingVisualizer = ({ initialAlgorithm = 'bubble', initialArrayLength = 50 }) => {
  const canvasRef = useRef(null);
  const [numbers, setNumbers] = useState([]);
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayLength, setArrayLength] = useState(initialArrayLength);
  const location = useLocation();
  const navigate = useNavigate();

  const CANVAS_WIDTH = Math.min(800, window.innerWidth - 40);
  const CANVAS_HEIGHT = Math.min(400, window.innerHeight - 300);
  const BAR_WIDTH = CANVAS_WIDTH / arrayLength;

  // Draw bars on canvas
  const drawBars = useCallback((arr) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context from canvas');
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < arr.length; i++) {
      ctx.fillStyle = 'white';
      ctx.fillRect(i * BAR_WIDTH, canvas.height - arr[i], BAR_WIDTH, arr[i]);
    }
  }, [BAR_WIDTH]);

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = debounce(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = Math.min(800, window.innerWidth - 40);
        canvas.height = Math.min(400, window.innerHeight - 300);
        drawBars(numbers);
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [numbers, drawBars]);

  // Generate random numbers
  const generateRandomNumbers = useCallback((length, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
  }, []);

  // Initialize numbers
  useEffect(() => {
    if (arrayLength > 0) {
      setNumbers(generateRandomNumbers(arrayLength, CANVAS_HEIGHT));
    } else {
      setNumbers([]);
    }
  }, [arrayLength, CANVAS_HEIGHT, generateRandomNumbers]);

    // Draw bars when numbers change
  useEffect(() => {
    drawBars(numbers);
  }, [numbers, drawBars]);

    // Start sorting
  const startSorting = async () => {
    if (isSorting || isLoading) return;

      // Shuffle numbers
    setIsLoading(true);
    const shuffledNumbers = generateRandomNumbers(arrayLength, CANVAS_HEIGHT);
    setNumbers(shuffledNumbers);

      // Sort numbers
    let sortedNumbers = [...shuffledNumbers];
    setIsSorting(true);
    setIsLoading(false);

    // Sort numbers
    try {
      switch (algorithm) {
        case 'bubble':
          await bubbleSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        case 'merge':
          await mergeSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        case 'quick':
          await quickSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        case 'insertion':
          await insertionSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        case 'selection':
          await selectionSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        case 'heap':
          await heapSort(sortedNumbers, drawBars, () => !isSorting);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Sorting failed', error);
    } finally {
      setIsSorting(false);
    }
  };

    // Handle algorithm change
  const handleAlgorithmChange = (e) => {
    const newAlgorithm = e.target.value;
    setAlgorithm(newAlgorithm);
    const newPath = `${location.pathname}?algorithm=${newAlgorithm}`;
    navigate(newPath, { replace: true });
  };

    // Handle array length change
  const handleArrayLengthChange = (e) => {
    const newLength = parseInt(e.target.value, 10);
    if (!isNaN(newLength) && newLength >= MIN_ARRAY_LENGTH && newLength <= MAX_ARRAY_LENGTH) {
      setArrayLength(newLength);
    }
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Sorting Algorithm Visualization</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="algorithm" className="block mb-2">Choose a sorting algorithm:</label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={handleAlgorithmChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="heap">Heap Sort</option>
            </select>
          </div>
          <div>
            <label htmlFor="arrayLength" className="block mb-2">Adjust Array Length: {arrayLength}</label>
            <input
              type="range"
              id="arrayLength"
              min={MIN_ARRAY_LENGTH}
              max={MAX_ARRAY_LENGTH}
              value={arrayLength}
              onChange={handleArrayLengthChange}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={startSorting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            disabled={isSorting || isLoading}
          >
            {isLoading ? 'Preparing...' : isSorting ? 'Sorting...' : 'Start Sorting'}
          </button>
          <Link to="/">
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded">
              Back to Home
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-white"
          ></canvas>
        </div>
      </div>
    </ErrorBoundary>
  );
};

SortingVisualizer.propTypes = {
  initialAlgorithm: PropTypes.string,
  initialArrayLength: PropTypes.number,
};

export default SortingVisualizer;

