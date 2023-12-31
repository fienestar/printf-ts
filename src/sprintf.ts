import {FormatFlags, PrefixContent} from './impl-types';
import {parseFlags, parseLengthModifier, parsePrecision, parseWidth} from './parser';
import stringifyChar from './stringify/char';
import stringifyDecimalAutoNotation from './stringify/float/decimal-general';
import stringifyDecimalExponentNotation from './stringify/float/decimal-exponent';
import stringifyDecimalNotation from './stringify/float/decimal-fixed';
import stringifyHexadecimalExponentNotation from './stringify/float/hexadecimal-exponent';
import stringifyInteger from './stringify/integer';
import stringifyString from './stringify/string';
import {FormatArgument} from './types';

function pad(prefixContent: PrefixContent, width: number, flags: FormatFlags) {
    const [prefix, content] = prefixContent;
    const padding = Math.max(0, width - prefix.length - content.length);
    if (flags['-']) {
        return prefix + content + ' '.repeat(padding);
    } else if (flags['0']) { // It is ignored if - flag is present.
        return prefix + '0'.repeat(padding) + content;
    } else {
        return ' '.repeat(padding) + prefix + content;
    }
}

export default function sprintf<Format extends string>(format: Format, ...args: FormatArgument<Format>): string {
    let output = '';
    for (let i={value: 0}; i.value!=format.length;) {
        if (format[i.value] !== '%') {
            output += format[i.value];
            i.value += 1;
        } else if (format[i.value+1] === '%') {
        // The full conversion specification must be %%.
            output += '%';
            i.value += 2;
        } else {
            i.value += 1;

            const flags = parseFlags(format, i);
            const width = parseWidth(format, i, args) ?? 0;
            const precision = parsePrecision(format, i, args);

            parseLengthModifier(format, i);

            const conversionSpecifier = format[i.value++];

            if (conversionSpecifier === undefined) {
                throw new Error('missing conversion specifier');
            }

            let prefixContent: PrefixContent = ['', ''];
            const isUpper = conversionSpecifier.toUpperCase() === conversionSpecifier;

            switch (conversionSpecifier) {
            case 'c': {
                prefixContent = stringifyChar(args);
                break;
            }
            case 's': {
                prefixContent = stringifyString(args, precision);
                break;
            }
            case 'd':
            case 'i':
            case 'u':
            case 'o':
            case 'x':
            case 'X':
            case 'p': {
                prefixContent = stringifyInteger(conversionSpecifier, isUpper, precision, args, flags);
                break;
            }
            case 'f':
            case 'F': {
                prefixContent = stringifyDecimalNotation(isUpper, precision, args, flags);
                break;
            }
            case 'e':
            case 'E': {
                prefixContent = stringifyDecimalExponentNotation(isUpper, precision, args, flags);
                break;
            }
            case 'g':
            case 'G': { // decimal or decimal exponent notation depending on the value and the precision
                prefixContent = stringifyDecimalAutoNotation(isUpper, precision, args, flags);
                break;
            }
            case 'n': { // the number of characters written
                if (width !== 0 || precision !== null || Object.values(flags).some((v) => v)) {
                    throw new Error('%n cannot contain width, precision or flags');
                }

                args.shift(); // null
                break;
            }

            default:
                throw new Error(`invalid conversion specifier: ${conversionSpecifier}`);
            }

            output += pad(prefixContent, width, flags);
        }
    }
    return output;
}
