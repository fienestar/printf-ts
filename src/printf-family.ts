
import sprintf from './sprintf';
import {FormatArgument} from './types';

export function vsprintf<Format extends string>(format: Format, args: FormatArgument<Format>): string {
    return sprintf(format, ...args);
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

export function printf<Format extends string>(format: Format, ...args: FormatArgument<Format>): number {
    return vprintf(format, args);
}

export {default as sprintf} from './sprintf';
