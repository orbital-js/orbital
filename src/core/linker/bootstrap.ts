import { Executable } from '../executable';

// TODO: this should be wrapped into OrbitalFactory
export function bootstrap(cli: any): Executable {
    // Build and search tree with names.
    return new cli();
}
