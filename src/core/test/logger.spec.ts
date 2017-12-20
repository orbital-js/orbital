import { Logger } from '../shared';
import { format } from '../shared/logger/format';
import { Level } from '../shared/logger/level';
import { expect } from 'chai';
import chalk from 'chalk';

describe('Logging', () => {
    describe('Format', () => {
        it('should format properly', () => {
            expect(format('info message', Level.INFO, 'Orbital'))
                .to.equal(chalk.blue('[Orbital]') + ' ' + chalk.greenBright('[info]') + ' ' + 'info message');

            expect(format('warn message', Level.WARN, 'Orbital'))
                .to.equal(chalk.blue('[Orbital]') + ' ' + chalk.yellowBright('[warn]') + ' ' + 'warn message');

            expect(format('error message', Level.ERROR, 'Orbital'))
                .to.equal(chalk.blue('[Orbital]') + ' ' + chalk.redBright('[error]') + ' ' + 'error message');
        });
    });

    it('should work print info warn and error', () => {
        // Dunno if this is really usefull
        Logger.info('info');
        Logger.warn('warn');
        Logger.error('error');
    });
});
