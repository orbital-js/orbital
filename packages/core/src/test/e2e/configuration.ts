import { expect } from 'chai';
import { CLIWithConfig } from 'shared/cli/cli-with-config';
import { OrbitalFactory } from '../../orbital-factory';
import { Logger } from '../../shared';

describe('OrbitalFactory', () => {

    it('should set the logger prefix to loggerPrefix', () => {
        OrbitalFactory.bootstrap(CLIWithConfig).execute();
        expect((Logger as any).prefix).to.equal('testgood-cli');
    });
});
