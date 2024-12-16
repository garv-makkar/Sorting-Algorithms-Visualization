// Merge Sort Algorithm
const mergeSort = async (arr, drawBars) => {
    
  // Merge two subarrays
  async function merge(arr, start, mid, end) {
    
    // Create temporary arrays
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    // Initialize pointers
    let i = 0, j = 0, k = start;

    // Merge the temporary arrays back into arr[start..end]
    while (i < left.length && j < right.length) {
      arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Copy the remaining elements
    while (i < left.length) {
      arr[k++] = left[i++];
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    while (j < right.length) {
      arr[k++] = right[j++];
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
    
  // Merge sort helper function
  async function mergeSortHelper(arr, start, end) {
    if (start < end) {

      // Find the middle point
      const mid = Math.floor((start + end) / 2);

      // Sort first and second halves
      await mergeSortHelper(arr, start, mid);
      await mergeSortHelper(arr, mid + 1, end);

      // Merge the sorted halves
      await merge(arr, start, mid, end);
    }
  }
  
  // Call the helper function
  await mergeSortHelper(arr, 0, arr.length - 1);
};
  
export default mergeSort;
  