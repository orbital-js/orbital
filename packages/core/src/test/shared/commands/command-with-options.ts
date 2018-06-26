import { Command, Executable, Option } from '../../../';

@Command({
    name: 'with-option',
    aliases: ['wo'],
})
export class CommandWithOption implements Executable {

    @Option({
        aliases: ['n'],
    }) name: string;

    @Option({
        name: 'any',
        aliases: undefined
    }) any: any;

    @Option({
        aliases: ['o', 'opt'],
        name: 'override',
    }) option: string;

    @Option({
        aliases: ['d'],
    }) default: string = 'def';

    @Option({
        aliases: ['enable'],
    }) enableDef: boolean;

    @Option() emptyOption: string;

    execute() {
        if (this.emptyOption) {
            throw new Error(this.emptyOption);
        } else if (this.option) {
            throw new Error(this.option);
        } else if (this.enableDef) {
            throw new Error(this.default);
        } else {
            throw new Error(this.name);
        }
    }

}
