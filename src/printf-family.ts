
import sprintf from './sprintf';
import {FormatArgument} from './types';

export function vsprintf<Format extends string>(format: Format, args: FormatArgument<Format>) {
    return sprintf(format, ...args);
}

export function vprintf<Format extends string>(format: Format, args: FormatArgument<Format>) {
    const text = vsprintf(format, args);
    console.log(text);
    return text;
}

export function printf<Format extends string>(format: Format, ...args: FormatArgument<Format>) {
    return vprintf(format, args);
}

export {default as sprintf} from './sprintf';
