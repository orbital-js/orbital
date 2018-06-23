import { Command, Executable, Option } from '@orbital/core';

@Command({
    name: 'with-option',
    alias: ['wo'],
})
export class CommandWithOption implements Executable {

    @Option({
        alias: ['n'],
    }) name: string;

    @Option({
        name: 'any',
        alias: undefined
    }) any: any;

    @Option({
        alias: ['o', 'opt'],
        name: 'override',
    }) option: string;

    @Option({
        alias: ['d'],
    }) default: string = 'def';

    @Option({
        alias: ['enable'],
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
