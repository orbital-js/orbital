import { Command, Executable } from '../../../src/core';

@Command({
    name: 'main'
})
export class MainCommand extends Executable {
    execute() {
        console.log('mainCommand');
    }
}
