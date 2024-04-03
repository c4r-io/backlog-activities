export default function checkExcludedValues(cordVals) {
    // Count the number of false values for the excluded property
    let falseCount = 0;
    for (let i = 0; i < cordVals.length; i++) {
        if (cordVals[i].user?.excluded !== true) {
            falseCount++;
        }
    }

    // Check if the count of false values is less than 2
    if (falseCount <= 2) {
        return true;
    } else {
        return false;
    }
}