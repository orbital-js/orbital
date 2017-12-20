import { CLI } from '@orbital/core';
import { EmptyCommand } from '../commands/empty-command';
import { Executable } from '../../../interfaces/executable';
import { TestCommand } from '../commands/command';

@CLI({
    name: 'test-cli-with-command',
    commands: [
        TestCommand,
    ],
})
export class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
