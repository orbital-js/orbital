import { expect } from 'chai';
import { CLIWithDisorderedParam } from 'shared/cli/cli-with-mismatched-params';
import { ParamOrderError } from '../../errors/param-order-error';
import { ParamUndefinedError } from '../../errors/param-undefined';
import { OrbitalFactory } from '../../orbital-factory';
import { CLIWithBadParam } from '../shared/cli/cli-with-bad-param';
import { GoodCLI } from '../shared/cli/good-cli';

describe('Commands with Params', () => {
    let cli: typeof OrbitalFactory;

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

    it('throw if a required parameter is not supplied', () => {
        expect(() => cli.execute(['good-cli', 'with-param']))
            .to.throw(ParamUndefinedError);
    });

    it('should only be allowed to decorate args of execute', () => {
        const cliWithBadParam = OrbitalFactory.bootstrap(CLIWithBadParam);
        expect(() => cliWithBadParam.execute(['test-cli', 'param']))
            .to.throw('a function');
    });

    it('should throw ParamOrderError if a required param comes after an optional param', () => {
        expect(() => OrbitalFactory.bootstrap(CLIWithDisorderedParam))
            .to.throw(ParamOrderError);
    });
});
