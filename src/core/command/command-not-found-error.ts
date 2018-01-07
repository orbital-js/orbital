export class CommandNotFoundError extends Error {
    constructor(commandName: string) {
        super(`Could not find command \`${commandName}\``);
    }
}
