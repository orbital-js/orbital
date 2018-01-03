export class CommandNotFound extends Error {
    constructor(commandName: string) {
        super(`Could not find command \`${commandName}\``);
    }
}
