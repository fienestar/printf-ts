import {PrefixContent} from '../impl-types';
import {StringFormatArgument} from '../types';

export default function stringifyString(args: any[], precision: number|null): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for string(%s) not exists');
    }

    const arg = args.shift() as StringFormatArgument;

    if (precision !== null) {
        return ['', arg.slice(0, precision)];
    } else {
        return ['', arg];
    }
}
