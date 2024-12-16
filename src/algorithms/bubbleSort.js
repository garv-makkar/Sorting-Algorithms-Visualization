// Bubble Sort Algorithm
const bubbleSort = async (arr, drawBars) => {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    
    // One pass of bubble sort
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {

        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50)); // Delay for visualization
    }
    n--;
  } while (swapped);
};
  
export default bubbleSort;

