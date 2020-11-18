# hardhat-lost-trace-repro

These reproductions might seem a little weird - they're minimizations of a use-case
specific to solidity-coverage.

I am expecting to be able to detect `pushData` values for instructions at a given step.

When method calls are forwarded from one contract to another, the trace seems to stop associating
steps with the relevant bytecode and `pushData` is unavailable.

## Install
```
yarn
```

## Test
```
npm test
```


