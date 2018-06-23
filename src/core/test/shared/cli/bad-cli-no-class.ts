import { CLI } from '@orbital/core';

@CLI({
    name: 'test-cli',
    declarations: [{}],
})
export class BadCliNoClass { }
