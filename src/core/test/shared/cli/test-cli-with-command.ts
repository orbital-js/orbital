import { CLI, Executable } from '@orbital/core';
import { TestCommand } from '../commands/command';
import { NoReturnCommand } from '../commands/command-no-return';
@CLI({
    name: 'test-cli-with-command',
    commands: [
        TestCommand,
        NoReturnCommand
    ],
})
export class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
