import { OrbitalConfiguration } from './configuration';
import { PRETTY_NAME } from './tokens';

export const defaultConfiguration: OrbitalConfiguration = {
    helpMessage: 'This is the auto-generated help for ' + PRETTY_NAME + '.\n' +
        'For help understanding these docs, go to ' +
        'https://www.orbital.io/docs/understanding-orbital-documentation.\n',
    loggerPrefix: PRETTY_NAME
};
