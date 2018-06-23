import { CLI, Executable } from '@orbital/core';
import { TestCommand } from '../commands/command';
import { EmptyCommand } from '../commands/empty-command';

@CLI({
    name: 'bad-cli-command',
    declarations: [
        TestCommand,
        EmptyCommand,
        'lol',
    ],
})
export class BadCliCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
