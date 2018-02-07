import { OrbitalFactory } from '@orbital/core';
import { expect } from 'chai';

import { GoodCLI } from '../shared/cli/good-cli';

describe('Commands with Options', () => {
    let cli;

    beforeEach(() => {
        cli = OrbitalFactory.bootstrap(GoodCLI);
    });

    it('options should be injected into the class', () => {
        const name = 'foo';
        expect(() => {
            cli.execute(['good-cli', 'with-option', '--name', name]);
        })
            .to.throw(name);
    });

    it('option aliases should be equivalent to options', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-option', '-n', name]))
            .to.throw(name);
    });

    it('should allow there to be multiple aliases', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-option', '--opt', name]))
            .to.throw(name);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-option', '--override', name]))
            .to.throw(name);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(() => cli.execute(['good-cli', 'with-option', '--emptyOption', name]))
            .to.throw(name);
    });

    it('should use default value if not set', () => {
        const def = 'def';
        expect(() => cli.execute(['good-cli', 'with-option', '--enableDef']))
            .to.throw(def);
    });

    it('should override default value if set', () => {
        expect(() => cli.execute(['good-cli', 'with-option', '--enableDef', '--default', 'yum']))
            .to.throw('yum');
    });
});
