import { OrbitalFactory } from '@orbital/core';

import { GoodCLI } from '../shared/cli/good-cli';

import { expect } from 'chai';

// TODO: These are e2e test and do not belong to option decorator
describe('Commands with Options', () => {
    // TODO: fix typing
    let factory;

    beforeEach(() => {
        factory = OrbitalFactory.bootstrap(GoodCLI);
    });

    it('options should be injected into the class', () => {
        const name = 'foo';
        expect(() => {
            factory.execute(['good-cli', 'with-option', '--name', name]);
        })
            .to.throw(name);
    });

    it('option aliases should be equivalent to options', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-option', '-n', name]))
            .to.throw(name);
    });

    it('should allow there to be multiple aliases', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-option', '--opt', name]))
            .to.throw(name);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-option', '--override', name]))
            .to.throw(name);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(() => factory.execute(['good-cli', 'with-option', '--emptyOption', name]))
            .to.throw(name);
    });
});
