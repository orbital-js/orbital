export function tern<T>(str1: T, str2: T): T {
    return str1 ? str1 : str2;
}
