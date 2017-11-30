import { CommandConfiguration } from './command-configuration.interface';
import { Executable } from '../executable';

/** Mixin type of a command after decoration */
export type DecoratedCommand = Executable & CommandConfiguration;
