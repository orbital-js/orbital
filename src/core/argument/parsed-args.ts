/**
 * @internal
 * An interface that is the parsed input from the command line.
 */
export interface ParsedArgs {
    /**
     * The command "name", also known as process.argv[1]
     */
    name: string;

    /**
     * the "params" passed in to the command line
     */
    arguments: string[];

    /**
     * a key-value store of the options and aliases passed into the command line
     */
    options: {
        [propName: string]: string | boolean;
    };
}
