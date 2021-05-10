export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // Compaing values, push to change color

        animations.push([i, j]);
        // Comparing, push to revert color
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            //Overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // Compaing values, push to change color

        animations.push([i, i]);
        // Compaing values, push to revert color

        animations.push([i, i]);
        // Overwrite value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // Compaing values, push to change color
        animations.push([j, j]);
        // Compaing values, push to revert color.
        animations.push([j, j]);
        // Overwrite value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}




export function getBubbleSortAnimations(arr) {
    const animations = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length; ++i) {
            animations.push([i, (i + 1)]);
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                animations.push([i, (arr[i + 1])]);
                animations.push([(i + 1), temp]);
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;

            }
            animations.push([i, (i + 1)]);
        }
    } while (swapped);


    return animations;
}




function swap(arr, index1, index2) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}


export function getQuickSortAnimations(arr) {
    const copy = [...arr];
    const animations = [];
    quickSortHelper(copy, 0, copy.length - 1, animations);
    return animations;
}

function quickSortHelper(arr, left, right, animations) {
    if (right <= left) return;
    const part = partition(arr, left, right, animations);
    quickSortHelper(arr, left, part, animations);
    quickSortHelper(arr, part + 1, right, animations);
}

function partition(arr, left, right, animations) {
    let i = left;
    let j = right + 1;
    const pivot = arr[left];
    while (true) {
        while (arr[++i] <= pivot) {
            if (i === right) break;
            animations.push([[i], false]);
        }
        while (arr[--j] >= pivot) {
            if (j === left) break;
            animations.push([[j], false]);
        }
        if (j <= i) break;
        animations.push([[i, arr[j]], true]);
        animations.push([[j, arr[i]], true]);
        swap(arr, i, j);
    }
    animations.push([[left, arr[j]], true]);
    animations.push([[j, arr[left]], true]);
    swap(arr, left, j);
    return j;
}


