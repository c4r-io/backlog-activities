export default function getRandomFalseIndex(arr) {
    // Filter out the indices of array elements that are false
    const falseIndices = arr.reduce((indices, value, index) => {
        if (!value) {
            indices.push(index);
        }
        return indices;
    }, []);

    // If there are no false values, return -1
    if (falseIndices.length === 0) {
        return -1;
    }

    // Choose a random index from the falseIndices array
    const randomIndex = Math.floor(Math.random() * falseIndices.length);

    // Return the corresponding index from the original array
    return falseIndices[randomIndex];
}