# pull-spec

check that a pull-stream has the correct behavior.

``` js
var Spec = require('pull-spec')
var pull = require('pull-stream')

pull(
  Spec(pull.values([1,2,3])),
  ...
)
```
will throw an error if the stream callsback too many times, or out of turn,
and also if read is called incorrectly.

It's generally enough to just connect the sink.

## License

MIT
