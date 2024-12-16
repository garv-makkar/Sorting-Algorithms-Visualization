// Quick Sort Algorithm
const quickSort = async (arr, drawBars, low = 0, high = arr.length - 1) => {
  
  if (low < high) {

    // pi is partitioning index, arr[pi] is now at right place
    const pi = await partition(arr, low, high, drawBars);

    // Recursively sort elements before and after partition
    await quickSort(arr, drawBars, low, pi - 1);
    await quickSort(arr, drawBars, pi + 1, high);
  }
};

const partition = async (arr, low, high, drawBars) => {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
      drawBars([...arr]); 
      await new Promise((resolve) => setTimeout(resolve, 50)); 
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  drawBars([...arr]); 
  await new Promise((resolve) => setTimeout(resolve, 50)); 
  return i + 1;
};

// Quick Sort Wrapper Function
const quickSortWrapper = async (arr, drawBars) => {
  await quickSort(arr, drawBars);
};

export default quickSortWrapper;