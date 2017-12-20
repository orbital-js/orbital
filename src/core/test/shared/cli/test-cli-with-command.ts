import { CLI, Executable } from '@orbital/core';
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
