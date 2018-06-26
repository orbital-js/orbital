export function tern<T>(str1: T | undefined, str2: T): T {
    return str1 ? str1 : str2;
}
