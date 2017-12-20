import { CLI, Command } from '@orbital/core';
// tslint:disable:max-classes-per-file
// tslint:disable:no-empty

// TODO: These are copy pasted from an other cli file ! USE TEH SHARED ONE
@Command({
    name: 'alpha',
    alias: ['a', 'b'],
})
export class Alpha {
    execute() { }
}

@Command({
    name: 'alpha',
    alias: ['e', 'c'],
})
export class Beta {
    execute() { }
}

@CLI({
    name: 'test-cli',
    commands: [
        Alpha,
        Beta,
    ],
})
export class MultipleNames { }
