# printf-ts

[![codecov](https://codecov.io/gh/fienestar/printf-ts/branch/main/graph/badge.svg?token=Y8GR64UX10)](https://codecov.io/gh/fienestar/printf-ts)

pure typescript implementation of printf-family with type checking

![preview](./preview.gif)

## Usage

```typescript
import { printf } from 'printf-ts';

// Hello printf 1 1.20
printf("Hello %s %d %.2lf", "printf", 1, 1.2)
```

## Features

### 1. vsprintf(format, args: [...]): string
### 2. sprintf(format, ...args: [...]): string
### 3. vprintf(format, args: [...]): number
### 4. printf(format, ...args: [...]): number
### 5. vprintfln(format, args: [...]): number
### 6. printfln(format, ...args: [...]): number

- 1 ~ 2 Returns the result as a string
- 3 ~ 4 Writes the results to the stdout, returns the number of characters printed
- 5 ~ 6 Writes the results to the stdout, returns the number of characters printed. if nodejs, append `\n` to the end(not affect to return value)

### Supported format specifiers

see [cppreference-printf](https://en.cppreference.com/w/c/io/fprintf) for each description of specifier

- flags: `+`, `-`, ` `, `#`, `0`
- `width`, `precision`
    - support wildcard(`*`)
- length modifier: `h`, `hh`, `l`, `ll`, `L`, `j`, `z`, `t`
- conversion specifier: `%c`, `%s`, `%d`, `%i`, `%u`, `%o`, `%x`, `%X`, `%f`, `%F`, `%e`, `%E`, `%g`, `%G`, `%p`, `%%`


### types

- if argument is negative and format specifier is unsigned, it will not convert to unsigned type
- argument is not converted to a number of specific bits
- if origin type was unsigned, find it in signed type

| specifier | argument type | description |
| :---: | :---: | :--- |
| `%c` | `string` | str[0] ?? '' |
| `%c` | `number` | utf8 code point |
| `%s` | `string` | |
| `%n` | `null` | please use sprintf(...).length |

#### integer
> %d, %i, %u, %o, %x, %X
- `short|int` -> `number`
- `long|long long|intmax_t|ssize_t|ptrdiff_t` -> `bigint`

#### Floating point
> %f, %F, %e, %E, %g, %G
- `double|long double` -> `number`
    - if value in [`infinity`, `-infinity`, `NaN`]
        - if specifier is uppercase(`F`,`E`,`G`,`A`) => `"INF"`, `"-INF"`, `"NAN"`
        - else => `"inf"`, `"-inf"`, `"nan"`
- NaN always treated as a positive value

#### Pointer
> %p
- `void*` -> `bigint`
    - if value is `0n` => `"(nil)"`
    - else => `"0x" + value.toString(16)`

### Wildcard
> \*
- `int` -> `number`