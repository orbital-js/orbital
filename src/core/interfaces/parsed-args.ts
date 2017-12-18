export interface ParsedArgs {
    name: string;
    arguments: string[];
    options: {
        [propName: string]: string | boolean;
    };
}
