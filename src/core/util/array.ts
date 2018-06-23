import { isNullOrUndefined } from 'util';

export function arrayIsPopulated(array: any): boolean {
    try {
        const isArray: boolean = Array.isArray(array);
        const isNotEmpty: boolean = array.length > 0;
        const firstElementIsNotNull: boolean = !isNullOrUndefined(array[0]);

        return isArray
            && isNotEmpty
            && firstElementIsNotNull;
    } catch {
        return false;
    }
}
