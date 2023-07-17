import {FormatFlags} from '../impl-types';

export function getPrefix(n: number | bigint, flags: FormatFlags): string {
    if (n >= 0) {
        if (flags['+']) {
            return '+';
        } else if (flags[' ']) { // It is ignored if + flag is present.
            return ' ';
        } else {
            return '';
        }
    } else {
        return '-';
    }
}

export function applyPrecision(n: string, precision: number): string {
    if (precision === 0 && n === '0') {
        return '';
    } else {
        return '0'.repeat(Math.max(0, precision - n.length)) + n;
    }
}
