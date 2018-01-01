// TODO: Why is this an abstract class if it holds no logic ?!
// Abstract classes can be extended, while interfaces can not. Up for Review? - WBH
export abstract class Executable {
    abstract execute(...args: any[]): void;
}
