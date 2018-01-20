import { expect } from 'chai';

import { devMode, enableProdMode, isDevMode, runModeLocked } from '../build-configuration';

describe('Build Configuration', () => {

    it('should lock runMode and should lock devMode', () => {
        // tslint:disable-next-line:no-unused-expression
        enableProdMode();
        expect(runModeLocked).to.equal(true);
        expect(devMode).to.equal(false);
    });

    it('should throw if you attempt to enable ProdMode after checking devMode', () => {
        isDevMode();
        expect(() => enableProdMode()).to.throw('Cannot enable prod mode after cli setup.');
    });

    it('should still return true to devMode', () => {
        expect(isDevMode()).to.equal(false);
    });
});
