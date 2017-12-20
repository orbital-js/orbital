// TODO: This in reality test if it is an array, so first you lie about it testing arrays, it test objects
// SO it does two things, test if an object is an array, and if a first element exists and is not null
export function arrayIsPopulated(array: any): boolean {
    const isArray = Array.isArray(array);
    const isNotEmpty = array.length > 0;
    const firstElementIsNotNull: boolean = array[0];

    return isArray
        && isNotEmpty
        && firstElementIsNotNull;
}
