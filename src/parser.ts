import {FormatFlags, FormatIterator} from './impl-types';
import {AnyFormatArgument, WildcardFormatArgument} from './types';

function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
}

export function parseFlags(format: string, iter: FormatIterator): FormatFlags {
    let i = iter.value;

    const flags = {
        '+': false,
        '-': false,
        ' ': false,
        '#': false,
        '0': false,
    };

    while (format[i] in flags) {
        flags[format[i++] as keyof FormatFlags] = true;
    }

    iter.value = i;
    return flags;
}

export function parseWidth(format: string, iter: FormatIterator, args: AnyFormatArgument[]): number | null {
    let i = iter.value;
    let width = '';

    if (isDigit(format[i])) {
        do {
            width += format[i++];
        }
        while (isDigit(format[i]));
    } else if (format[i] === '*') {
        if (args.length === 0) {
            throw new Error('argument for * not exists');
        }

        width = (args.shift() as WildcardFormatArgument).toString();
        i += 1;
    } else {
        return null;
    }

    if (parseInt(width).toString() !== width) {
        throw new Error(`${width} is too big or not an integer`);
    }

    iter.value = i;
    return parseInt(width);
}

export function parsePrecision(format: string, iter: FormatIterator, args: AnyFormatArgument[]): number | null {
    if (format[iter.value] !== '.') {
        return null;
    } // use default precision

    iter.value += 1;

    // If neither a number nor * is used, the precision is taken as zero
    const width = parseWidth(format, iter, args) ?? 0;

    // If the value of this argument is negative, it is ignored.
    if (width < 0) {
        return null;
    } else {
        return width;
    }
}

export function parseLengthModifier(format: string, iter: FormatIterator): string {
    const lengthModifier =
        ['hh', 'h', 'll', 'l', 'j', 'z', 't']
            .find((modifier) => format.startsWith(modifier, iter.value)) ?? '';
    iter.value += lengthModifier.length;
    return lengthModifier;
}
