import { Executable } from './executable';

export interface CommandMap {
    instance: Executable;
    name: string;
    alias: string[];
    // subcommands: CommandMapObject[];
    params: Array<{
        index: number;
        name?: string;
    }>;
    options: {
        [propName: string]: string | boolean;
    };
}
