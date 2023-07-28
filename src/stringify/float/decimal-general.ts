import {FormatFlags, PrefixContent} from '../../impl-types';
import {AnyFormatArgument} from '../../types';
import {getPrefix} from '../numeric';
import stringifyNonFiniteValue from './nonfinite';

function fixedNotation(n: number, precision: number, flags: FormatFlags): string {
    let content = Math.abs(n).toFixed(precision);

    if (!flags['#'] && content.includes('.')) {
        content = content.replace(/\.?0*$/, '');
    }

    return content;
}

function exponentialNotation(n: number, precision: number, flags: FormatFlags): string {
    let content = Math.abs(n).toExponential(precision);

    if (content.split('e')[1].length === 2) {
        content = content.slice(0, -1) + '0' + content.at(-1);
    }

    if (!flags['#']) {
        content = content.replace(/\.?0*e/, 'e');
    }

    return content;
}

export default function stringifyDecimalGeneralNotation(
    isUpper: boolean,
    precision: number|null,
    args: AnyFormatArgument[],
    flags: FormatFlags,
): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for decimal general notation(%g,%G) not exists');
    }

    const n = args.shift() as number;
    let content: string|null = stringifyNonFiniteValue(isUpper, n, flags);

    if (content === null) {
        const P = (precision ?? 6) || 1;
        const X = parseInt(n.toExponential(P - 1).split('e')[1], 10);

        // n can be rounded up or down depending on the precision. so we need to branch over X, not n.
        if (P > X && X >= -4) {
            content = fixedNotation(n, P - 1 - X, flags);
        } else {
            content = exponentialNotation(n, P - 1, flags);
        }
    }

    if (isUpper) {
        content = content.toUpperCase();
    }

    return [getPrefix(n, flags), content];
}
