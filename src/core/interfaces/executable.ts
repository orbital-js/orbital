import { Constructor } from '../util/constructor';

// OMG: Why is this an abstract class if it holds no logic ?!
export abstract class Executable {
    abstract execute(...args: any[]): void;
}
