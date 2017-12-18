import { Command } from '../../../command/command';
import { Executable } from '../../../interfaces/executable';
import { Option } from '../../../option/option';

@Command({
    name: 'with-option',
    alias: 'wo',
})
export class CommandWithOption implements Executable {

    @Option({
        alias: 'n',
    }) name: string;

    @Option({
        alias: ['o', 'opt'],
        name: 'override',
    }) option: string;

    @Option() emptyOption: string;

    execute() {
        if (this.emptyOption) {
            throw new Error(this.emptyOption);
        } else if (this.option) {
            throw new Error(this.option);
        } else {
            throw new Error(this.name);
        }
    }

}
