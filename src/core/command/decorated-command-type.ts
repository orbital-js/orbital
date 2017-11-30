import { CommandConfiguration } from './command-configuration.interface';
import { Executable } from '../executable';

export type DecoratedCommand = Executable & CommandConfiguration;
