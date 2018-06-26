import { OrbitalFactory } from '../../src/core';
import { ExampleCLI } from './example.cli';

OrbitalFactory
    .bootstrap(ExampleCLI)
    .execute(process.argv);
