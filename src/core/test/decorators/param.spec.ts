import { OrbitalFactory } from '@orbital/core';

import { CLIWithBadParam } from '../shared/cli/cli-with-bad-function';
import { GoodCLI } from '../shared/cli/good-cli';

import { expect } from 'chai';

// TODO: this is e2e
describe('Commands with Params', () => {
    // TODO: fix typing
    let cli;

    before(() => {
        // OMG: This is also a cli
        cli = OrbitalFactory.bootstrap(GoodCLI);
    });

    it('parameters should be reflected into the class', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-param', name]))
            .to.throw(name);
    });


    it('should support multiple parameters', () => {
        expect(() => {
            cli.execute(['good-cli', 'with-param', 'tim', 32]);
        })
            .to.throw('32');
    });
    
    it('should only be allowed to decorate args of execute', () => {
        // OMG: The thing you called fact here is actually a cli ...
        const fact = OrbitalFactory.bootstrap(CLIWithBadParam);
        expect(() => fact.execute(['test-cli', 'param']))
            .to.throw('a function');
    });
});
