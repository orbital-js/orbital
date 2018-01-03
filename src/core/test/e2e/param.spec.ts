import { OrbitalFactory } from '@orbital/core';
import { expect } from 'chai';

import { CLIWithBadParam } from '../shared/cli/cli-with-bad-param';
import { GoodCLI } from '../shared/cli/good-cli';

describe('Commands with Params', () => {
    let cli;

    before(() => {
        cli = OrbitalFactory.bootstrap(GoodCLI);
    });

    it('parameters should be reflected into the class', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-param', name]))
            .to.throw(name);
    });

    it('should support multiple parameters', () => {
        expect(() => cli.execute(['good-cli', 'with-param', 'tim', 32]))
            .to.throw('32');
    });

    it('should only be allowed to decorate args of execute', () => {
        const cliWithBadParam = OrbitalFactory.bootstrap(CLIWithBadParam);
        expect(() => cliWithBadParam.execute(['test-cli', 'param']))
            .to.throw('a function');
    });
});
