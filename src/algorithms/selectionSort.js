// Selection Sort Algorithm
const selectionSort = async (arr, drawBars) => {

  // Iterate through the array
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      
      // Find the minimum element in the unsorted part of the array
      for (let j = i + 1; j < arr.length; j++) {
        
        // Update the index of the minimum element
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      // Swap the minimum element with the first element of the unsorted part
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };
  
  export default selectionSort;
