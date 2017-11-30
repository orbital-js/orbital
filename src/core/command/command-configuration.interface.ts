export interface CommandConfiguration {
    name?: string;
    aliases?: string[];
    commands?: CommandConfiguration[];
}
