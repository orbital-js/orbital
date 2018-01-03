import { expect } from 'chai';
import { BuildConfiguration } from '../build-configuration';

describe('Orbital ref', () => {
    let buildConfiguration: BuildConfiguration;

    beforeEach(() => {
        buildConfiguration = BuildConfiguration.getInstance();
    });

    it('should return the same instance', () => {
        expect(BuildConfiguration.getInstance()).to.deep.equal(BuildConfiguration.getInstance());
    });

    it('should throw if enabling prod mode after accessing isDevMode ?', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(buildConfiguration.isDevMode()).to.be.true;
        expect(() => buildConfiguration.enableProdMode()).to.throw('Cannot enable prod mode after cli setup.');
    });
});
