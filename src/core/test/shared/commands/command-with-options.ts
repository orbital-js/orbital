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

    execute() {
        throw new Error(this.name);
    }

}
