
import sprintf from './sprintf';
import {FormatResult} from './sprintf-result-type';
import {FormatArgument} from './types';

export function vsprintf<
    Format extends string,
    Arguments extends FormatArgument<Format>
>(format: Format, args: Arguments): FormatResult<Format, Arguments> {
    return sprintf(format, ...args) as FormatResult<Format, Arguments>;
}

export function vprintf<Format extends string>(format: Format, args: FormatArgument<Format>): number {
    const text = vsprintf(format, args);

    if (typeof process !== 'undefined' && process?.stdout?.write !== undefined) {
        process.stdout.write(text);
    } else {
        console.log(text);
    }

    return text.length;
}

export function vprintfln<Format extends string>(format: Format, args: FormatArgument<Format>): number {
    const text = vsprintf(format, args);
    console.log(text);
    return text.length;
}

export function printf<Format extends string>(format: Format, ...args: FormatArgument<Format>): number {
    return vprintf(format, args);
}

export function printfln<Format extends string>(format: Format, ...args: FormatArgument<Format>): number {
    return vprintfln(format, args);
}

export {default as sprintf} from './sprintf';
