import { CLI, Command } from '../../../';
// tslint:disable:max-classes-per-file
// tslint:disable:no-empty

@Command({
    name: 'alpha',
    aliases: ['a', 'b'],
})
export class Alpha {
    execute() { }
}

@Command({
    name: 'alpha',
    aliases: ['e', 'c'],
})
export class Beta {
    execute() { }
}

@CLI({
    name: 'test-cli',
    declarations: [
        Alpha,
        Beta,
    ],
})
export class MultipleNames { }
