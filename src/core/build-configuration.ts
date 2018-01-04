let devMode: boolean = true;
let runModeLocked: boolean = false;

export function enableProdMode(): void {
    if (runModeLocked) {
        throw new Error('Cannot enable prod mode after cli setup.');
    }
    runModeLocked = true;
    devMode = false;
}

export function isDevMode(): boolean {
    runModeLocked = true;
    return devMode;
}
