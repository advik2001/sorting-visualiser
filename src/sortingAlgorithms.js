export const bubbleSort = (array) => {
  const animations = [];
  const auxArray = array.slice();
  for (let i = 0; i < auxArray.length; i++) {
    for (let j = 0; j < auxArray.length - i - 1; j++) {
      animations.push([j, j + 1, 'compare']);
      if (auxArray[j] > auxArray[j + 1]) {
        animations.push([j, j + 1, 'swap']);
        [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
      }
      animations.push([j, j + 1, 'revert']);
    }
  }
  return animations;
};

export const mergeSort = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j, 'compare']);
    animations.push([i, j, 'revert']);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i], 'overwrite']);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j], 'overwrite']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i, 'compare']);
    animations.push([i, i, 'revert']);
    animations.push([k, auxiliaryArray[i], 'overwrite']);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j, 'compare']);
    animations.push([j, j, 'revert']);
    animations.push([k, auxiliaryArray[j], 'overwrite']);
    mainArray[k++] = auxiliaryArray[j++];
  }
};

export const quickSort = (array) => {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

const quickSortHelper = (array, startIdx, endIdx, animations) => {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
};

const partition = (array, startIdx, endIdx, animations) => {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx, 'compare']);
    animations.push([i, endIdx, 'revert']);
    if (array[i] < pivotValue) {
      animations.push([i, pivotIdx, 'swap']);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }
  animations.push([pivotIdx, endIdx, 'swap']);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
  return pivotIdx;
};
