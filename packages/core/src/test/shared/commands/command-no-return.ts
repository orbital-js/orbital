import { Command, Executable } from '../../../';

@Command({
    name: 'no-return',
})
export class NoReturnCommand extends Executable {
    execute() {
        console.log('will not return');
    }
}
