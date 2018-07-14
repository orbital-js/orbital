export interface OrbitalConfiguration {
    /**
     * The first message to display to your users when the help appears. By default,
     * it mentions that the help is auto-generated and links to a document for understanding
     * the documentation.
     */
    helpMessage?: string;

    /**
     * Message that will appear in brackets before logger messages. If set to null,
     * there no prefix will be displayed.
     *
     * @default PRETTY_NAME
     */
    loggerPrefix?: string;
}
