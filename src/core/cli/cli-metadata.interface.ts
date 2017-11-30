import { Type } from '../type';

/**
 * Configuration declaration for the CLI
 */
export interface CLIConfiguration {
    name?: string;
    version?: string;
    commands?: Array<Type<any> | any[]>;
}
