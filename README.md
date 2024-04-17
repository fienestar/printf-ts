# printf-ts

[![codecov](https://codecov.io/gh/fienestar/printf-ts/branch/main/graph/badge.svg?token=Y8GR64UX10)](https://codecov.io/gh/fienestar/printf-ts)

This branch implements the ability to compute sprintf at the type level.

currently implemented %s.

```typescript
let a = sprintf('Hello |%-5.3s|', '1234' as const);
a = "other"; // error TS2322: Type '"other"' is not assignable to type '"Hello |123  |"'.
let b = sprintf('!%s! %d..', '1234', 12) // b: '!${string}! ${number}..'
```

see type-level sprintf at [src/sprintf-result-type.ts](src/sprintf-result-type.ts)
see type-level integer operations at [src/number-type-operation.ts](src/number-type-operation.ts)

It's just a joke, and will never actually stay in the main branch.
- This will increase compile time.
- As shown in the code above, this feature breaks backwards compatibility, and I don't want to raise the major version because of it
- It doesn't seem useful to have the return type converted to a more specific type
- Things like %c are nearly impossible to implement: You have to create a table of integer mappings for every character...

I just made it because I was bored and it was exam week at school.
