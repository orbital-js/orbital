import { expect } from 'chai';
import { OrbitalFactory } from '../../';
import { UnknownOptionError } from '../../errors/unknown-option-error';
import { GoodCLI } from '../shared/cli/good-cli';

describe('Commands with Options', () => {

    it('options should be injected into the class', () => {
        const name = 'foo';
        expect(runWith(['good-cli', 'with-option', '--name', name]))
            .to.throw(name);
    });

    it('option aliases should be equivalent to options', () => {
        const name = 'foo';
        expect(runWith(['good-cli', 'with-option', '-n', name]))
            .to.throw(name);
    });

    it('should allow there to be multiple aliases', () => {
        const name = 'foo';
        expect(runWith(['good-cli', 'with-option', '--opt', name]))
            .to.throw(name);
    });

    it('should throw if an option is unknown', () => {
        expect(runWith(['good-cli', 'with-option', '-q']))
            .to.throw(UnknownOptionError);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(runWith(['good-cli', 'with-option', '--override', name]))
            .to.throw(name);
    });

    it('should override name property from propertyKey', () => {
        const name = 'foo';
        expect(runWith(['good-cli', 'with-option', '--emptyOption', name]))
            .to.throw(name);
    });

    it('should use default value if not set', () => {
        expect(runWith(['good-cli', 'with-option', '--enableDef']))
            .to.throw('def');
    });

    it('should override default value if set', () => {
        expect(runWith(['good-cli', 'with-option', '--enableDef', '--default', 'yum']))
            .to.throw('yum');
    });
});

const runWith = (params) => () => OrbitalFactory
    .bootstrap(GoodCLI)
    .execute(params);
