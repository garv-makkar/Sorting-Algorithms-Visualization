// Insertion Sort Algorithm
const insertionSort = async (arr, drawBars) => {

  // Iterate through the array
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      drawBars(arr);
      await new Promise((resolve) => setTimeout(resolve, 50)); 
    }
    arr[j + 1] = key;
    drawBars(arr);
    await new Promise((resolve) => setTimeout(resolve, 50)); 
  }
};

export default insertionSort;
