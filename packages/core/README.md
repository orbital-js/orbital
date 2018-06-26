# Orbital

Orbital is the CLI framework from the future. Using powerful features from TypeScript, like metadata and decorators, there is no limit to what you can create with Orbital.

## Features

- Support for options and parameters (arguments)
- Command and option aliases
- Automatic help generation out of the box
- Git-style subcommands

## Example

Here's an example of the simplest CLI you can build with Orbital.

```ts
import { CLI, Command, OrbitalFactory } from '@orbital/core';

@Command({
    name: 'hello'
})
export class HelloCommand {
    execute() {
        console.log('Hello, World!');
    }
}

@CLI({
    declarations: [
        HelloCommand
    ]
})
export class HelloCLI { }

OrbitalFactory
    .bootstrap(HelloCLI)
    .execute(process.argv)
```