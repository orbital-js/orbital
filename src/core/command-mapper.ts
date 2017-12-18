import { CommandMap } from './interfaces/command-map';
import { Logger } from './util/logger';
import { getClassMetadata } from './reflection/class';

export class CommandMapper {
    private commands: CommandMap[] = [];
    private logger = new Logger('Orbital');

    public map(commands: any[]): CommandMap[] | undefined {
        const commandInstances = commands.map(C => {
            try {
                const command = new C();
                return command;
            } catch (e) {
                throw new Error('One of your commands is not an instance of `Executable`.');
            }
        });
        const commandMetadatas = commands.map(c => getClassMetadata(c));
        for (let i = 0; i < commands.length; i++) {
            const commandInstance = commandInstances[i];
            const commandMetadata = commandMetadatas[i];


            if (typeof commandMetadata.alias === 'string') {
                commandMetadata.alias = [commandMetadata.alias];
            }

            this.isThereACommandNamed(commandMetadata.name);
            this.isThereACommandWithAlias(commandMetadata.alias, commandMetadata.name);

            if (commandInstance.execute) {

                // for (const opt in commandInstance.constructor.options) {
                //     if (typeof commandInstance.constructor.options[opt] === 'string') {
                //         commandMetadata.options[opt] = [commandMetadata.options[opt]];
                //     }
                // }

                this.commands.push({
                    instance: commandInstance,
                    name: commandMetadata.name,
                    alias: commandMetadata.alias,
                    params: commandInstance.constructor.params,
                    options: commandInstance.constructor.options,
                });

            } else {
                const err = 'Command ' + commandMetadata.name
                    + ' does not have a method called execute, so it can not be run.';
                this.logger.error(err);
                throw new Error(err);
            }
        }
        return this.commands;
    }

    private isThereACommandNamed(name: string) {
        const commands = this.commands.filter(c => c.name === name);
        if (commands.length > 0) {
            const err = 'Two commands named "' + name + '" exist. Please rename or remove one of them.';
            this.logger.error(err);
            throw new Error(err);
        } else {
            return false;
        }
    }

    private isThereACommandWithAlias(alias: string[], name: string) {
        const aliasMap: any = {};
        for (const command of this.commands) {
            aliasMap[command.name] = command.alias;
        }
        for (const c in aliasMap) {
            if (aliasMap[c]) {
                const aliases = aliasMap[c];
                for (const a of alias) {
                    if (aliases.indexOf(a) > -1) {
                        const error = 'Multiple commands with alias "' + a + '" exist: "' + name + '" and "' + c + '".';
                        this.logger.error(error);
                        throw new Error(error);
                    }
                }
            }
        }
        return false;
    }
}
