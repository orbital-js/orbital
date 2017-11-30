import { Executable } from '../executable';
import { CLIConfiguration } from '../cli/cli-configuration.interface';

// I really dislike this name, it will be imported from @orbital/core anyway
// On the other hand it really is a factory for Orbital CLI applications. idk.
export class OrbitalFactory {
    public static bootstrap(cli: CLIConfiguration & Executable): Executable {
        // Build and search tree with names.
        // TODO: refactor resolution logic from CLI decorator to here
        // Maybe create a CommandResolver object that would simply resolves to which command the args correspond to ?
    }
}
