import { Executable } from '../../../interfaces/executable';
import { CLI } from '../../../cli/cli';

@CLI({
    name: 'test-cli-with-command',
    commands: [{
        name: 'test-command',
        execute: () => {
            throw new Error('Leaf command');
        },
    }],
})
export class TestCliWithCommand implements Executable {
    execute(...args: any[]) { throw new Error('Method not implemented'); }
}
