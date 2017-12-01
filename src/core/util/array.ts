function arrayIsPopulated(array: any): boolean {
    return Array.isArray(array) && array.length && array.length > 0 && array[0];
}
