import { expect } from 'chai';
import { enableProdMode, isDevMode } from '../build-configuration';

describe('Orbital ref', () => {
    it('should throw if enabling prod mode after accessing isDevMode ?', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(isDevMode()).to.be.true;
        expect(() => enableProdMode()).to.throw('Cannot enable prod mode after cli setup.');
    });

    it('should still return true to devMode', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(isDevMode()).to.be.true;
    });
});
