import { Command, Executable, Param } from '../../../';

@Command({
    name: 'with-param',
    aliases: ['wp'],
    description: 'A command with a parameter'
})
export class CommandWithDisorderedParam implements Executable {
    execute(
        @Param() name: string,
        @Param({
            required: true,
            name: 'ageNumber'
        }) age?: number,
    ) {
        if (age) {
            throw new Error(age.toString());
        } else {
            throw new Error(name);
        }
    }
}
