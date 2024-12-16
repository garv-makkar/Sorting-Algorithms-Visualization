// Heapsort Algorithm
const heapSort = async (arr, drawBars) => {
  const n = arr.length;
  
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, drawBars);
  }
  
  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    drawBars(arr);
    await new Promise((resolve) => setTimeout(resolve, 50)); // Delay for visualization
    
    // Call max heapify on the reduced heap
    await heapify(arr, i, 0, drawBars);
  }
};
  
const heapify = async (arr, n, i, drawBars) => {

  // Initialization
  let largest = i; 
  const left = 2 * i + 1; 
  const right = 2 * i + 2; 

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap

    drawBars(arr);
    await new Promise((resolve) => setTimeout(resolve, 50)); // Delay for visualization

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest, drawBars);
  }
};

export default heapSort;
  