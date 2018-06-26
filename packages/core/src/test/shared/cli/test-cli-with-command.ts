import { CLI, Executable } from '../../../';
import { TestCommand } from '../commands/command';
import { NoReturnCommand } from '../commands/command-no-return';
@CLI({
    name: 'test-cli-with-command',
    declarations: [
        TestCommand,
        NoReturnCommand
    ],
})
export class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
