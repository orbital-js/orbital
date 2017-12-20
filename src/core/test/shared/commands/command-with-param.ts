import { Command, Executable, Param } from '@orbital/core';

@Command({
    name: 'with-param',
    alias: ['wp'],
})
export class CommandWithParam implements Executable {
    execute(
        @Param() name: string,
        @Param() age?: number,
    ) {
        if (age) {
            throw new Error(age.toString());
        } else {
            throw new Error(name);
        }
    }
}
