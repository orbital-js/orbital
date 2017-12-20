import { Command, Executable, Param } from '@orbital/core';

@Command({
    name: 'param',
})
export class CommandWithBadDecorator implements Executable {
    execute() {
        this.badFunction('hello');
    }

    badFunction( @Param() param: any) {
        throw new Error('a function');
    }

}
