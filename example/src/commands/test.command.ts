import { Command, Executable, Option, Param } from '../../../src/core';

@Command({
    name: 'test',
    aliases: ['t'],
    description: 'Just a simple test command!'
})
export class TestCommand extends Executable {

    @Option({
        aliases: ['p', 'c'],
        description: 'Just the word cake. If you want it, you can have it.'
    }) cake: any;

    execute(
        @Param({
            name: 'slime',
            description: 'The first string to log out',
            required: true
        }) slime: string,
        @Param({
            name: 'str',
            description: 'The second string to log out'
        }) str: string
    ) {
        console.log(slime, str);
    }
}
