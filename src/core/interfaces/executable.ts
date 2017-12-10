import { Constructor } from '../util/constructor';
export abstract class Executable {
    abstract execute(...args: any[]): void;
}
