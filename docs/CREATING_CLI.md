## Creating a CLI

```ts
import {OrbitalFactory} from '@orbital/core';
import {CLIModule} from './cli.module';

OrbitalFactory
    .bootstrap(CLIModule)
    .execute(process.argv);
```

If, for some reason, your CLI module requires constructor arguments, you can pass them in with `.inject()`.

```ts
import {CLI} from '@orbital/core';

@CLI(/* ... */)
export class CLIModule {
    constructor(
        public something: string
    ){ }

    execute() {
        console.log(this.something);
    }
}
```

```ts
import {OrbitalFactory} from '@orbital/core';
import {CLIModule} from './cli.module';

OrbitalFactory
    .inject(['something']) // you can use an array
    .bootstrap(CLIModule)
    .execute(process.argv);

// ALTERNATIVELY

OrbitalFactory
    .inject('something') // you can use rest params
    .bootstrap(CLIModule)
    .execute(process.argv);
```
