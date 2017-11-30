import { Executable } from '../executable';
import { DecoratedCommand } from './decorated-command-type';

export interface CommandConfiguration {
    name?: string;
    aliases?: string[];
    commands?: DecoratedCommand[];
}
