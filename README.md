# log

Node js library for logging

## Using

```js
import { createLogger, getLogger } from '@fesuy/log';

// Add filepath param for log into file. 
// The default log will show with console
createLogger();

let logger = getLogger();

// Sample Output: 
// [19:00:00][INFO] My Message
logger.info('My message');
```

## Logger Utility
* `info` 
* `warn` 
* `debug` 
* `error` 
* `trace` 
