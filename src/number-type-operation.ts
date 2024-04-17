import {Digit} from './types';

export type ParseNumber<Input extends string>
    = string extends Input
    ? number
    : Input extends `${infer Parsed extends number}`
    ? Parsed
    : never;

type SingleDigitAddOne<N extends Digit | ''>
    = N extends '0' | ''
    ? '1'
    : N extends '1'
    ? '2'
    : N extends '2'
    ? '3'
    : N extends '3'
    ? '4'
    : N extends '4'
    ? '5'
    : N extends '5'
    ? '6'
    : N extends '6'
    ? '7'
    : N extends '7'
    ? '8'
    : N extends '8'
    ? '9'
    : '10';

type SingleDigitSubOne<N extends Digit | ''>
    = N extends '0' | ''
    ? never
    : N extends '1'
    ? '0'
    : N extends '2'
    ? '1'
    : N extends '3'
    ? '2'
    : N extends '4'
    ? '3'
    : N extends '5'
    ? '4'
    : N extends '6'
    ? '5'
    : N extends '7'
    ? '6'
    : N extends '8'
    ? '7'
    : '8';

type PopDigit<N extends string>
    = N extends Digit
    ? N
    : N extends `${infer _First}${infer Last}`
    ? PopDigit<Last>
    : never;

type AfterPopDigit<N extends string>
    = N extends Digit
    ? ''
    : N extends `${infer Rest}${Digit}`
    ? Rest
    : never;

type IntAddOne<N extends string>
    = N extends Digit | ''
    ? SingleDigitAddOne<N>
    : PopDigit<N> extends '9'
    ? `${IntAddOne<AfterPopDigit<N>>}0`
    : `${AfterPopDigit<N>}${SingleDigitAddOne<PopDigit<N>>}`;

type IntSubOne<N extends string>
    = N extends Digit
    ? SingleDigitSubOne<N>
    : PopDigit<N> extends '0'
    ? `${IntSubOne<AfterPopDigit<N>>}9`
    : `${AfterPopDigit<N>}${SingleDigitSubOne<PopDigit<N>>}`;

type AddSingleDigit<N1 extends string, N2 extends Digit>
    = N2 extends '0'
    ? N1
    : AddSingleDigit<IntAddOne<N1>, SingleDigitSubOne<N2>>;

type SubSingleDigit<N1 extends string, N2 extends Digit>
    = N2 extends '0'
    ? N1
    : SubSingleDigit<IntSubOne<N1>, SingleDigitSubOne<N2>>;

export type IntAdd<N1 extends string, N2 extends string>
    = N1 extends ''
    ? N2
    : N2 extends ''
    ? N1
    : AddSingleDigit<PopDigit<N1>, PopDigit<N2>> extends `1${infer Last extends Digit}`
    ? `${IntAddOne<IntAdd<AfterPopDigit<N1>, AfterPopDigit<N2>>>}${Last}`
    : `${IntAdd<AfterPopDigit<N1>, AfterPopDigit<N2>>}${AddSingleDigit<PopDigit<N1>, PopDigit<N2>>}`;

export type IntSub<N1 extends string, N2 extends string>
    = N2 extends ''
    ? N1
    : N1 extends ''
    ? never
    : SubSingleDigit<PopDigit<N1>, PopDigit<N2>> extends never
    ? `${IntSubOne<IntSub<AfterPopDigit<N1>, AfterPopDigit<N2>>>}9`
    : `${IntSub<AfterPopDigit<N1>, AfterPopDigit<N2>>}${SubSingleDigit<PopDigit<N1>, PopDigit<N2>>}`;

export type GetLengthOfString<S extends string>
    = S extends `${infer _}${infer Rest}`
    ? IntAddOne<GetLengthOfString<Rest>>
    : '0';
