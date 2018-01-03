
/** @ignore not in use for the moment */
export class BuildConfiguration {
    private static instance: BuildConfiguration;
    private devMode: boolean = true;
    private runModeLocked: boolean = false;

    private constructor() { }

    public enableProdMode(): void {
        if (this.runModeLocked) {
            throw new Error('Cannot enable prod mode after cli setup.');
        }
        this.runModeLocked = true;
        this.devMode = false;
    }

    public isDevMode(): boolean {
        this.runModeLocked = true;
        return this.devMode;
    }

    public static getInstance(): BuildConfiguration {
        if (!this.instance) {
            this.instance = new BuildConfiguration();
        }
        return this.instance;
    }
}
