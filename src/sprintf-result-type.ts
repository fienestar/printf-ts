/* eslint-disable max-len */
import {PrefixContent} from './impl-types';
import {GetLengthOfString, IntAdd, IntSub} from './number-type-operation';
import {AnyFormatArgument, CharSpecifier, Digit, DoubleSpecifier, FormatArgument, FormatFlag, IntMaxSpecifier, IntSpecifier, LLongSpecifier, LongDoubleSpecifier, LongSpecifier, NumberOfWrittenSpecifier, PersentSpecifier, PointerDifferenceSpecifier, PointerSpecifier, ShortSpecifier, SizeSpecifier, StringFormatArgument, StringSpecifier, WildcardFormatArgument} from './types';

export type FormatResult<Format extends string, Arguments>
    = Format extends `%${PersentSpecifier}${infer Next}`
    ? `%${FormatResult<Next, Arguments>}`
    : Format extends `%${infer Next}`
    ? ParseFlag<Next, Arguments, ''>
    : Format extends `${infer First}${infer Next}`
    ? `${First}${FormatResult<Next, Arguments>}`
    : '';

type HasFlag<Flags extends string, Flag extends FormatFlag>
    = Flags extends ''
    ? false
    : Flags extends `${infer First}${infer Rest}`
    ? First extends Flag
    ? true
    : HasFlag<Rest, Flag>
    : false;

type ParseFlag<Format extends string, Arguments, Flags extends string>
    = Format extends `${infer Flag extends FormatFlag}${infer Next}`
    ? ParseFlag<Next, Arguments, `${Flags}${Flag}`>
    : ParseWidth<Format, Arguments, Flags>;

type ArrayShift<T> = T extends [infer First, ...infer _Rest] ? First : never;
type ArrayShifted<T> = T extends [infer _First, ...infer Rest] ? Rest : never;
type Assert<T, Expected> = T extends Expected ? T : never;

type ParseWidth<Format extends string, Arguments, Flags extends string>
    = Format extends `${infer First extends Digit}${infer Next}`
    ? ParseIntegerWidth<Next, Arguments, Flags, First>
    : Format extends `*${infer Next}`
    ? ParsePrecision<Next, ArrayShifted<Arguments>, Flags, `${Assert<ArrayShift<Arguments>, WildcardFormatArgument>}`>
    : ParsePrecision<Format, Arguments, Flags, ''>;

type ParseIntegerWidth<Format extends string, Arguments, Flags extends string, Width extends string>
    = Format extends `${infer First extends Digit}${infer Next}`
    ? ParseIntegerWidth<Next, Arguments, Flags, `${Width}${First}`>
    : ParsePrecision<Format, Arguments, Flags, Width>;

type ParsePrecision<Format extends string, Arguments, Flags extends string, Width extends string>
    = Format extends `.*${infer Next}`
    ? ParseConversionSpecifier<Next, ArrayShift<Arguments>, Flags, Width, `${Assert<ArrayShift<Arguments>, WildcardFormatArgument>}`>
    : Format extends `.${infer Next}`
    ? ParseIntegerPrecision<Next, Arguments, Flags, Width, ''>
    : ParseConversionSpecifier<Format, Arguments, Flags, Width, ''>;

type ParseIntegerPrecision<Format extends string, Arguments, Flags extends string, Width extends string, Precision extends string>
    = Format extends `${infer First extends Digit}${infer Next}`
    ? ParseIntegerPrecision<Next, Arguments, Flags, Width, `${Precision}${First}`>
    : ParseConversionSpecifier<Format, Arguments, Flags, Width, Precision>;

type AnyConversionSpecifier = CharSpecifier | StringSpecifier | ShortSpecifier | IntSpecifier | LongSpecifier | LLongSpecifier | IntMaxSpecifier | SizeSpecifier | PointerDifferenceSpecifier | DoubleSpecifier | LongDoubleSpecifier | NumberOfWrittenSpecifier | PointerSpecifier;

type FormatArgumentFor<Specifier extends AnyConversionSpecifier>
    = ArrayShift<FormatArgument<`%${Specifier}`>>;

type ParseConversionSpecifier<Format extends string, Arguments, Flags extends string, Width extends string, Precision extends string>
    = Format extends `${infer Specifier extends AnyConversionSpecifier}${infer Next}`
    ? `${FormatConversionResult<Specifier, Flags, Width, Precision, ArrayShift<Arguments>>}${FormatResult<Next, ArrayShifted<Arguments>>}`
    : never

type LengthModifiers = 'hh' | 'h' | 'l' | 'll' | 'j' | 'z' | 't';

type FormatConversionResult<Specifier extends AnyConversionSpecifier, Flags extends string, Width extends string, Precision extends string, Argument>
    = Specifier extends `${LengthModifiers}${infer RestSpecifier extends AnyConversionSpecifier}`
    ? FormatConversionResult<RestSpecifier, Flags, Width, Precision, Argument>
    : FormatArgumentFor<Specifier> extends Argument
    ? string // argument is not constant. cannot format in compile time
    : string extends Flags
    ? string
    : string extends Width
    ? string
    : string extends Precision
    ? string
    : FormatConversionResultHelper<Specifier, Flags, Width, Precision, Argument> extends PrefixContent
    ? PadConversionResult<FormatConversionResultHelper<Specifier, Flags, Width, Precision, Argument>, Width, Flags>
    : FormatUnimplementedConversionResult<Specifier, Flags, Width, Precision, Assert<Argument, AnyFormatArgument>>

type FormatConversionResultHelper<Specifier extends AnyConversionSpecifier, Flags extends string, Width extends string, Precision extends string, Argument>
    = Specifier extends 's'
    ? FormatStringConversionResult<Flags, Width, Precision, Assert<Argument, StringFormatArgument>>
    : null;

type PaddingLengthOf<Prefix extends string, Content extends string, Width extends string>
    = IntSub<Width, IntAdd<GetLengthOfString<Prefix>, GetLengthOfString<Content>>> extends never
    ? '0'
    : IntSub<Width, IntAdd<GetLengthOfString<Prefix>, GetLengthOfString<Content>>>;

type Repeat<S extends string, N extends string>
    = N extends '0'
    ? ''
    : `${S}${Repeat<S, IntSub<N, '1'>>}`;

type PadConversionResult<PrefixContentValue extends PrefixContent, Width extends string, Flags extends string>
    = PrefixContentValue extends [infer Prefix extends string, infer Content extends string]
    ? HasFlag<Flags, '-'> extends true
    ? `${Prefix}${Content}${Repeat<' ', PaddingLengthOf<Prefix, Content, Width>>}`
    : HasFlag<Flags, '0'> extends true
    ? `${Prefix}${Repeat<'0', PaddingLengthOf<Prefix, Content, Width>>}${Content}`
    : `${Repeat<' ', PaddingLengthOf<Prefix, Content, Width>>}${Prefix}${Content}`
    : never;

type AfterPopString<S extends string, Result extends string = ''>
    = S extends `${infer First}${infer Rest}`
    ? Rest extends ''
    ? Result
    : AfterPopString<Rest, `${Result}${First}`>
    : never;

type SliceEnd<S extends string, End extends string>
    = IntSub<GetLengthOfString<S>, End> extends '0'
    ? S
    : SliceEnd<AfterPopString<S>, End>;

type FormatStringConversionResult<_Flags extends string, _Width extends string, Precision extends string, Argument extends StringFormatArgument>
    = Precision extends ''
    ? ['', Argument]
    : ['', SliceEnd<Argument, Precision>];

type StringifyPrecision<Precision extends string>
= Precision extends ''
? ''
: `.${Precision}`;

type FormatUnimplementedConversionResult<Specifier extends AnyFormatArgument, Flags extends string, Width extends string, Precision extends string, Argument extends AnyFormatArgument>
    = `{${Argument}|${Flags}${Width}${StringifyPrecision<Precision>}${Specifier}}`;

declare function sprintf<Format extends string, Arguments extends FormatArgument<Format>>(format: Format, ...args: Arguments): FormatResult<Format, Arguments>;

/*
let a = sprintf('Hello |%-5.3s|', '1234' as const);
a = 'other';
*/
