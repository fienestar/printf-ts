// ----------------------------------------------
// Policy

/*
    char = string | number
    if v is string => insert v[0] ?? ""
    if v is number => insert String.fromCharCode(Math.floor(v))
*/
export type CharFormatArgument = string | number;

/*
    string
*/
export type StringFormatArgument = string;

/*
    number
    if v is not integer => insert floor(v)
    if v is negative with unsigned specifier => insert v (not converted to unsigned)
    *the argument is not converted to a number of specific bits
*/
export type ShortFormatArgument = number;
export type IntFormatArgument = number;

/*
    bigInt
    if v is negative with unsigned specifier => insert v (not converted to unsigned)
    *the argument is not converted to a number of specific bits
*/
export type LongFormatArgument = bigint;
export type LLongFormatArgument = bigint;
export type IntMaxFormatArgument = bigint;
export type SizeFormatArgument = bigint;
export type PointerDifferenceFormatArgument = bigint;

/*
    floating-point number
    if v in [infinity, -infinity, NaN]
        if specifier is uppercase(F,E,G,A) => insert "INF", "-INF", "NAN"
        else => insert "inf", "-inf", "nan"
*/
export type DoubleFormatArgument = number;
export type LongDoubleFormatArgument = number;

/*
    the number of written characters
    please use sprintf(...).length
    only for compatibility
*/
export type NumberOfWrittenFormatArgument = null;

/*
    pointer
    if v is 0n => insert "(nil)"
    else => insert "0x" + v.toString(16)
*/
export type PointerFormatArgument = bigint;

/*
    * in width or precision
    ex) %*d, %.*f
*/
export type WildcardFormatArgument = number;

export type AnyFormatArgument = CharFormatArgument
    | StringFormatArgument
    | ShortFormatArgument
    | IntFormatArgument
    | LongFormatArgument
    | LLongFormatArgument
    | IntMaxFormatArgument
    | SizeFormatArgument
    | PointerDifferenceFormatArgument
    | DoubleFormatArgument
    | LongDoubleFormatArgument
    | NumberOfWrittenFormatArgument
    | PointerFormatArgument
    | WildcardFormatArgument;

// ----------------------------------------------

export type Digit = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';
export type FormatFlag = '-'|'+'|' '|'#'|'0';

export type SignedIntegerSpecifier = 'd'|'i';
export type UnsignedIntegerSpecifier = 'o'|'x'|'X'|'u';
export type IntegerSpecifier = SignedIntegerSpecifier | UnsignedIntegerSpecifier;
export type FloatSpecifier = 'f'|'F'|'e'|'E'|'g'|'G'; // |"a"|"A"; a is not implemented

// LengthModifier + ConversoinSpecifier
export type PersentSpecifier = '%';
export type CharSpecifier = 'c' | 'lc' | `hh${IntSpecifier}`
export type StringSpecifier = 's' | 'ls';
export type ShortSpecifier = `h${IntegerSpecifier}`
export type IntSpecifier = IntegerSpecifier;
export type LongSpecifier = `l${IntegerSpecifier}`;
export type LLongSpecifier = `ll${IntegerSpecifier}`;
export type IntMaxSpecifier = `j${IntegerSpecifier}`;
export type SizeSpecifier = `z${IntegerSpecifier}`;
export type PointerDifferenceSpecifier = `t${IntegerSpecifier}`;
export type LongDoubleSpecifier = `L${FloatSpecifier}`;
export type DoubleSpecifier = `${'l'|''}${FloatSpecifier}`;
export type NumberOfWrittenSpecifier = `${'hh' | 'h' | '' | 'l' | 'll' | 'j' | 'z' | 't'}n`;
export type PointerSpecifier = 'p';

// %
export type FormatArgument<Format extends string>
    = Format extends `%${PersentSpecifier}${infer Next}`
    ? FormatArgument<Next>
    : Format extends `%${infer Next}`
    ? ParseFlag<Next>
    : Format extends `${Format[0]}${infer Next}`
    ? FormatArgument<Next>
    : [];

// %+
type ParseFlag<Format extends string>
    = Format extends `${FormatFlag}${infer Next}`
    ? ParseFlag<Next>
    : ParseWidth<Format>;

// %+10, %+*
type ParseWidth<Format extends string>
    = Format extends `${Digit}${infer Next}`
    ? ParseIntegerWidth<Next>
    : Format extends `*${infer Next}`
    ? [WildcardFormatArgument, ...ParsePrecision<Next>]
    : ParsePrecision<Format>;

// %+10
type ParseIntegerWidth<Format extends string>
    = Format extends `${Digit}${infer Next}`
    ? ParseIntegerWidth<Next>
    : ParsePrecision<Format>;

// %+10.5, %+10.*
type ParsePrecision<Format extends string>
    = Format extends `.*${infer Next}`
    ? [WildcardFormatArgument, ...ParseConversionSpecifier<Next>]
    : Format extends `.${infer Next}`
    ? ParseIntegerPrecision<Next>
    : ParseConversionSpecifier<Format>;

// %+10.5
type ParseIntegerPrecision<Format extends string>
    = Format extends `${Digit}${infer Next}`
    ? ParseIntegerPrecision<Next>
    : ParseConversionSpecifier<Format>;

// %+10.5d
type ParseConversionSpecifier<Format extends string>
    = Format extends `${CharSpecifier}${infer Next}`
    ? [CharFormatArgument, ...FormatArgument<Next>]
    : Format extends `${StringSpecifier}${infer Next}`
    ? [StringFormatArgument, ...FormatArgument<Next>]
    : Format extends `${ShortSpecifier}${infer Next}`
    ? [ShortFormatArgument, ...FormatArgument<Next>]
    : Format extends `${IntSpecifier}${infer Next}`
    ? [IntFormatArgument, ...FormatArgument<Next>]
    : Format extends `${LongSpecifier}${infer Next}`
    ? [LongFormatArgument, ...FormatArgument<Next>]
    : Format extends `${LLongSpecifier}${infer Next}`
    ? [LLongFormatArgument, ...FormatArgument<Next>]
    : Format extends `${IntMaxSpecifier}${infer Next}`
    ? [IntMaxFormatArgument, ...FormatArgument<Next>]
    : Format extends `${SizeSpecifier}${infer Next}`
    ? [SizeFormatArgument, ...FormatArgument<Next>]
    : Format extends `${PointerDifferenceSpecifier}${infer Next}`
    ? [PointerDifferenceFormatArgument, ...FormatArgument<Next>]
    : Format extends `${DoubleSpecifier}${infer Next}`
    ? [DoubleFormatArgument, ...FormatArgument<Next>]
    : Format extends `${LongDoubleSpecifier}${infer Next}`
    ? [LongDoubleFormatArgument, ...FormatArgument<Next>]
    : Format extends `${NumberOfWrittenSpecifier}${infer Next}`
    ? [NumberOfWrittenFormatArgument, ...FormatArgument<Next>]
    : Format extends `${PointerSpecifier}${infer Next}`
    ? [PointerFormatArgument, ...FormatArgument<Next>]
    : [InvalidFormatArgument, ...FormatArgument<Format>]

type InvalidFormatArgument = [never];
