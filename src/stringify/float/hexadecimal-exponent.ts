import {FormatFlags, PrefixContent} from '../../impl-types';
import {AnyFormatArgument} from '../../types';

// %a, %A
export default function stringifyHexadecimalExponentNotation(
    _isUpper: boolean,
    _precision: number|null,
    _args: AnyFormatArgument[],
    _flags: FormatFlags,
): PrefixContent {
    throw new Error('Not implemented');
}
