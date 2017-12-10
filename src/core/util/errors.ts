export function commandNotExecutable(name?: string) {
    if (name) {
        return name + ' is not a valid instance of `Executable`';
    }
    return 'One of your commands is not an instance of `Executable`.';
}
