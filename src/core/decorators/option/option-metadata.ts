/**
 * Configuration for the `Option` decorator
 */
export interface OptionMetadata {
    name: string | symbol;
    alias?: string[];
    brief?: string;
    description?: string;
}
