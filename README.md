[![Build Status](https://travis-ci.org/orbital-js/orbital.svg?branch=old-version)](https://travis-ci.org/orbital-js/orbital)
[![Coverage Status](https://coveralls.io/repos/github/orbital-js/orbital/badge.svg?branch=master)](https://coveralls.io/github/orbital-js/orbital?branch=master)
[![Join the chat at https://gitter.im/orbital-js/orbital](https://badges.gitter.im/orbital-js/orbital.svg)](https://gitter.im/orbital-js/orbital?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
# Orbital
Command line framework in Typescript for nodejs. Orbital is complete rewrite based on the API [Clime](https://github.com/vilic/clime) was providing.

## Motivations
We were not happy of the CLI framework we were using to create a [cli](https://github.com/nestjs/nest-cli) for the [Nest](https://github.com/nestjs/nest) framework, so we decided to write one in Typescript with the new declarative/decorator syntax that arised along with angular and found about [Clime](https://github.com/vilic/clime). We're now in the process of rewriting our own from scratch using a similar API Clime provided.

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
