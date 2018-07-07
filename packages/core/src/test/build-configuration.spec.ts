import { expect } from 'chai';
import { GoodCLI } from 'shared/cli/good-cli';
import { devMode, enableProdMode, isDevMode, runModeLocked } from '../build-configuration';
import { CommandNotFoundError } from '../errors/command-not-found.error';
import { OrbitalFactory } from '../orbital-factory';

describe('Build Configuration', () => {

    after(() => {
        (devMode as any) = true;
    });

    it('should lock runMode and should lock devMode', () => {
        enableProdMode();
        expect(runModeLocked).to.equal(true);
        expect(devMode).to.equal(false);
    });

    it('should throw if you attempt to enable ProdMode after checking devMode', () => {
        isDevMode();
        expect(() => enableProdMode()).to.throw('Cannot enable prod mode after cli setup.');
    });

    it('should not return true for devMode', () => {
        expect(isDevMode()).to.equal(false);
    });

    it('should not throw error in prod mode', () => {
        const execution = () => OrbitalFactory.bootstrap(GoodCLI).execute(['good-cli', 'command-not-found']);
        expect(execution).to.not.throw(CommandNotFoundError);
    });
});
