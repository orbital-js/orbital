import { Command, Executable } from '@orbital/core';

@Command({
    name: 'no-return',
})
export class NoReturnCommand extends Executable {
    execute() {
        console.log('will not return');
    }
}
