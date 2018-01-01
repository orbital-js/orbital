export function arrayIsPopulated(array: any): boolean {
    const isArray = Array.isArray(array);
    const isNotEmpty = array.length > 0;
    const firstElementIsNotNull: boolean = array[0];

    return isArray
        && isNotEmpty
        && firstElementIsNotNull;
}
