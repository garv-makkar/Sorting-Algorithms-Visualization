import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sorting Algorithm Components
const SortingAlgorithm = ({ title, description, timeComplexity, pseudoCode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Pseudo-code copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="mb-3">{description}</p>
      <p className="mb-3"><strong>Time Complexity:</strong> {timeComplexity}</p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        {isExpanded ? "Hide Pseudo Code" : "Show Pseudo Code"}
      </button>
      {isExpanded && (
        <div className="relative mt-3">
          <pre className="p-3 bg-gray-800 rounded overflow-x-auto">
            <code>{pseudoCode}</code>
          </pre>
          <button 
            onClick={() => copyToClipboard(pseudoCode)}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

// Notes Page
const NotesPage = () => {
  const sortingAlgorithms = [
    {
      title: "Bubble Sort",
      description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It's not suitable for large data sets as its average and worst-case time complexity is quite high.",
      timeComplexity: "O(n^2)",
      pseudoCode: `procedure bubbleSort(A : list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
    until not swapped
end procedure`
    },
    {
      title: "Merge Sort",
      description: "Merge Sort is a divide-and-conquer algorithm that divides the unsorted list into n sublists, each containing one element, then repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining.",
      timeComplexity: "O(n log n)",
      pseudoCode: `procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 
        return A
    middle = length(A) / 2
    left = A[0...middle]
    right = A[middle...end]
    return merge(mergeSort(left), mergeSort(right))
end procedure

procedure merge(left, right : list of sortable items)
    result = []
    while length(left) > 0 and length(right) > 0
        if left[0] <= right[0]
            append left[0] to result
            left = left[1...end]
        else
            append right[0] to result
            right = right[1...end]
    append remaining items in left to result
    append remaining items in right to result
    return result
end procedure`
    },
    {
      title: "Quick Sort",
      description: "Quick Sort is an efficient, in-place sorting algorithm that uses divide-and-conquer principles. It selects a 'pivot' element and partitions the array around the pivot, then recursively sorts the sub-arrays.",
      timeComplexity: "Average case: O(n log n), Worst case: O(n^2)",
      pseudoCode: `procedure quickSort(A : list of sortable items, low, high : int)
    if low < high then
        pivotIndex = partition(A, low, high)
        quickSort(A, low, pivotIndex - 1)
        quickSort(A, pivotIndex + 1, high)

procedure partition(A : list of sortable items, low, high : int)
    pivot = A[high]
    i = low - 1
    for j = low to high - 1 do
        if A[j] <= pivot then
            i = i + 1
            swap A[i] with A[j]
    swap A[i + 1] with A[high]
    return i + 1`
    },
    {
      title: "Insertion Sort",
      description: "Insertion Sort builds the final sorted array one item at a time. It's much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it performs well for small datasets or partially sorted arrays.",
      timeComplexity: "O(n^2)",
      pseudoCode: `procedure insertionSort(A : list of sortable items)
    for i = 1 to length(A) - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = key`
    },
    {
      title: "Selection Sort",
      description: "Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion, swapping it with the leftmost unsorted element, and moving the boundary one element to the right.",
      timeComplexity: "O(n^2)",
      pseudoCode: `procedure selectionSort(A : list of sortable items)
    n = length(A)
    for i = 0 to n - 1 do
        min_idx = i
        for j = i + 1 to n do
            if A[j] < A[min_idx] then
                min_idx = j
        swap A[i] with A[min_idx]`
    },
    {
      title: "Heap Sort",
      description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.",
      timeComplexity: "O(n log n)",
      pseudoCode: `procedure heapSort(A : list of sortable items)
    buildMaxHeap(A)
    for i = length(A) - 1 to 1 do
        swap A[0] with A[i]
        heapify(A, 0, i)

procedure buildMaxHeap(A : list of sortable items)
    for i = length(A) / 2 - 1 to 0 do
        heapify(A, i, length(A))

procedure heapify(A : list of sortable items, i : int, size : int)
    largest = i
    left = 2i + 1
    right = 2i + 2
    if left < size and A[left] > A[largest] then
        largest = left
    if right < size and A[right] > A[largest] then
        largest = right
    if largest != i then
        swap A[i] with A[largest]
        heapify(A, largest, size)`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Sorting Algorithms</h1>
      <p className="text-xl mb-8 text-center">
        Learn about different sorting algorithms, their characteristics, time complexities, and implementations.
      </p>
      
      {sortingAlgorithms.map((algo, index) => (
        <SortingAlgorithm key={index} {...algo} />
      ))}
      
      <div className="text-center mt-8">
        <Link to="/">
          <button className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotesPage;
