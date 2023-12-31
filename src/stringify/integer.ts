import {FormatFlags, PrefixContent} from '../impl-types';
import {AnyFormatArgument} from '../types';
import {getPrefix} from './numeric';

export function applyIntegerPrecision(n: string, precision: number): string {
    if (precision === 0 && n === '0') {
        return '';
    } else {
        return '0'.repeat(Math.max(0, precision - n.length)) + n;
    }
}

export default function stringifyInteger(
    conversionSpecifier: string,
    isUpper: boolean,
    precision: number|null,
    args: AnyFormatArgument[],
    flags: FormatFlags,
): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for integer not exists');
    }

    let arg = args.shift() as number | string | bigint;

    if (typeof arg === 'string') {
        arg = arg.charCodeAt(0);
    }

    let prefix = getPrefix(arg, flags);
    if (arg < 0) {
        arg = -arg;
    }

    if (conversionSpecifier === 'p' || ('xX'.includes(conversionSpecifier) && arg !== 0 && arg !== 0n && flags['#'])) {
        // In the alternative implementation 0x or 0X is prefixed to results if the converted value is nonzero.
        prefix += '0x';
    }

    let convertedValue = '';
    if ('diu'.includes(conversionSpecifier)) {
        convertedValue = arg.toString(10);
    } else if (conversionSpecifier === 'o') {
        convertedValue = arg.toString(8);
    } else if ('xXp'.includes(conversionSpecifier)) {
        convertedValue = arg.toString(16);
        if (isUpper) {
            prefix = prefix.toUpperCase();
            convertedValue = convertedValue.toUpperCase();
        }
    }

    if (precision !== null || conversionSpecifier === 'p') {
        // For integer numbers it is ignored if the precision is explicitly specified.
        flags['0'] = false;
    }

    precision ??= 1;

    if (flags['#'] && conversionSpecifier === 'o') {
        // In the alternative implementation precision is increased if necessary, to write one leading zero. In that case if both the converted value and the precision are 0, single 0 is written.
        prefix += '0';
    }

    if (conversionSpecifier === 'p' && convertedValue === '0') {
        prefix = '';
        convertedValue = '(nil)';
    } else {
        convertedValue = applyIntegerPrecision(convertedValue, precision);
    }

    return [prefix, convertedValue];
}
