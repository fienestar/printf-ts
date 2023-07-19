import {FormatArgument, sprintf} from '../src';

export function expectSprintfRejects<Format extends string>(
    format: Format,
    ...args: any[] // need to test invalid format or argument
) {
    return expect((async () => {
        return sprintf(format, ...args as FormatArgument<Format>);
    })()).rejects;
}

export function expectSprintf<Format extends string>(
    format: Format,
    ...args: FormatArgument<Format>
) {
    return expect(sprintf(format, ...args));
}
