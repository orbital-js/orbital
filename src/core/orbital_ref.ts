let _devMode: boolean = true;
let _runModeLocked: boolean = false;

export function enableProdMode(): void {
    if (_runModeLocked) {
        throw new Error('Cannot enable prod mode after cli setup.');
    }
    _devMode = false;
}

export function isDevMode(): boolean {
    _runModeLocked = true;
    return _devMode;
}
