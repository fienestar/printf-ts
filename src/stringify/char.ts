import {PrefixContent} from '../impl-types';
import {CharFormatArgument} from '../types';

export default function stringifyChar(args: any[]): PrefixContent {
    if (args.length === 0) {
        throw new Error('argument for character(%c) not exists');
    }

    const arg = args.shift() as CharFormatArgument;
    if (typeof arg === 'string') {
        return ['', arg[0] ?? ''];
    } else {
        return ['', String.fromCharCode(Math.floor(arg))];
    }
}
