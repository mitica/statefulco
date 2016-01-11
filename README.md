# statefulco

A Nodejs client for stateful.co service

## Usage

```
var stateful = require('statefulco');
var counter = stateful.counter;

counter.inc('counter-name', function(error, value) {
  // value is the currenct value
});

counter.set('counter-name', 10, function(error, value) {
  // success: counter-name == 10
});
```

## API

### counter.inc(counter, [value], [config], callback)

Increments a counter with `value` or 1

`config` is: 
- **user** - user key, or env STATEFUL_USER
- **token** - user token, or env STATEFUL_TOKEN
- **timeout** - request timeout, or env STATEFUL_TIMEOUT, default: 5000 ms

### counter.set(counter, value, [config], callback)

Set counter's value.
