import { Command } from '../../../command/command';
import { Executable } from '../../../interfaces/executable';

@Command({
    name: 'test-command',
})
export class TestCommand extends Executable {
    execute() {
        throw new Error('Leaf command');
    }
}
