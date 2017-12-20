import { CLI } from '@orbital/core';
import { EmptyCommand } from '../commands/empty-command';
import { Executable } from '../../../interfaces/executable';
import { TestCommand } from '../commands/command';

@CLI({
    name: 'test-cli-with-command',
    commands: [
        TestCommand,
        EmptyCommand,
    ],
})
export class TestCliWithBadCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
