[![Build Status](https://travis-ci.org/orbital-js/orbital.svg?branch=master)](https://travis-ci.org/orbital-js/orbital)
[![Coverage Status](https://coveralls.io/repos/github/orbital-js/orbital/badge.svg)](https://coveralls.io/github/orbital-js/orbital)
[![Join the chat at https://gitter.im/orbital-js/orbital](https://badges.gitter.im/orbital-js/orbital.svg)](https://gitter.im/orbital-js/orbital?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
# Orbital
Orbital is a dead-simple, cutting-edge CLI framework. Taking cues from [Angular](https://www.angular.io) and [Clime](https://github.com/vilic/clime), Orbital was designed with simplicity and scalability in mind.

## Motivations
The Orbital Core team members were originally contributors to the [Nest CLI](https://github.com/nestjs/nest-cli) for the increasingly popular [Nest](https://github.com/nestjs/nest) framework. We found it difficult to contribute since the codebase was complex, and so CLI development stagnated. We decided to rewrite the CLI with a new framework we'd create ourselves, that would be fast, scalable, and easy to understand. Thus, Orbital was born.

## What we're moving towards
```typescript
/// example.cli.ts
import { CLI, Executable } from '@orbital/core';

import { ExampleCommand } from './commands/example/example.command';
import { InfoCommand } from './commands/info.command';

@CLI({
   name: 'example',
   version: '1.0.0',
   commands: [
      ExampleCommand,
      InfoCommand
   ]
})
export class ExampleCLI implements Executable {
   execute() { }
}
```
```typescript
/// commands/example/example.command.ts
import { Parameter, Command, Executable, Option, UseOptions, VariadicParameter } from '@orbital/core';

import { ServiceCommand } from './service/service.command';

@Command({
    name: 'example',
    aliases: ['e'],
    brief: 'This is a one line description',
    description: `
      This is a long decription,
      It is split across multiple lines
    `,
    subCommands: [
        ServiceCommand
    ]
})
export class ExampleCommand implements Executable {

    @Option({
        flag: 'b',
        brief: '',
        description: '',
        validators: []
    })
    bar: string;

    constructor(
        @UseOptions(GenerateOptions) private options: GenerateOptions
    ) { }

    execute(
        @Parameter({
            brief: '',
            description: '',
            validators: []
        }) url: URL,

        @Parameter({
            brief: '',
            description: '',
            required: false,
            validators: []
        }) optional: string,

        @VariadicParameter({
            validators: []
        }) foo: string[]
    ) {
        // implementation
    }
}
```
