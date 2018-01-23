import { OrbitalFactory } from '../../src/core';
import { ExampleCLI } from './cli';

OrbitalFactory
    .bootstrap(ExampleCLI)
    .execute(process.argv);
